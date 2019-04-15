let express = require('express');
let cookieParser = require('cookie-parser');
let dateFormat = require('dateformat');

let app = express();
app.use(cookieParser());

let multer = require('multer');
let upload = multer({
    dest: __dirname + '/uploads/'
});

let fs = require('fs');

let randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return [r.toString(16),g.toString(16),b.toString(16)];
}

let new_User = (username, password) => ({
    username: username,
    password: password,
    color: '#' + randomColor().join(','),
});
let userlist = [];
let userlist_filename = __dirname + '/userlist.json';
let saveUserList = () => fs.writeFileSync(userlist_filename, JSON.stringify(userlist));

let sessions = {};
let currentUser = (req) => sessions[req.cookies.sid];
let currentUserColor = (user) => {
    try {
        return userlist.filter(u=>u.username === user)[0].color;    
    } catch (error) {
        return randomColor();
    }
}

let new_Post = (username, post, images) => ({
    username: username,
    post: post,
    date: new Date(),
    images: images,
    likes: [],
    comments: [],
});
let postlist = [];
let postlist_filename = __dirname + '/postlist.json';
let savePostList = () => fs.writeFileSync(postlist_filename, JSON.stringify(postlist));
let greetingUser = (req) =>  `Hello <label style="color:`+ currentUserColor(currentUser(req)) +`">` + currentUser(req) + `</label>` + 
                             `, Your SID is ` + req.cookies.sid + 
                             `, You posted `+ postlist.filter(p=>p.username === currentUser(req)).length  +`th threads`;

app.use("/images", express.static(__dirname + '/uploads'));

app.use(function (req, res, next) {
    console.log('[', dateFormat( Date.now() ), '] [', req.method, ']', req.path, JSON.stringify(req.body), currentUser(req));
    next()
});

app.get("/", (req, res) => {

    if( currentUser(req) !== undefined ) {
        res.redirect("/thread");
        return;
    }

    res.send(fs.readFileSync(__dirname + "/public/index.html").toString())
});

app.post("/signup", upload.none(), (req, res) => {
    const user = new_User(req.body.username, req.body.password);

    if(userlist.find(u=>u.username === user.username)) {
        res.send(`<h1>`+user.username+` is already used.</h1>`);
        return;
    }
    userlist.push(user);
    saveUserList()

    res.send(`<h1>successful signup</h1><a href="/">Login</a>`);
});

app.post("/login", upload.none(), (req, res) => {
    const user = new_User(req.body.username, req.body.password);

    console.table(userlist);

    if(userlist.filter(u=>u.username === user.username && u.password === user.password).length !== 1) {
        res.send(`<h1>invalid username or password</h1><a href="/">Login</a>`);
        return;
    }

    let sessionId = Math.floor(Math.random() * 1000000).toString();
    sessions[sessionId] = user.username;
    res.cookie('sid', sessionId, { expires: new Date(Date.now() + 900000), httpOnly: true });

    res.send(`<h1>successful login</h1><a href="/thread">Post a thread</a>
            <script> 
                setTimeout('location.href="/thread"', 1000) 
            </script>`);
});

app.get("/logout", (req, res) => {
    res.cookie('sid', '');

    res.redirect("/");
});

let html_post = (post) => post.post + ` written by <label class='postby' style='color:`+ currentUserColor(post.username) +`'>`+post.username+`</label> 
                                        at <label class='postat'>`+dateFormat(post.date, "")+`</label>` + 
                                        (post['likes'] && post.likes.length > 0 ? ' likes by ' + post.likes.join(',') : '');

let html_comment = (post) =>    post['comments'] && post['comments'].length > 0 ? 
                                `<br />- ` + post.comments.map(c=> html_post(c) ).join('<br />-') :
                                ''

app.get("/thread", (req, res) => {

    if( currentUser(req) === undefined ) {
        res.redirect("/");
        return;
    }

    let posttags = [`<ul>`];

    postlist.forEach((post, i) => {
        posttags.push(
            `<li>`+ 
                post.images.map(img=>`<img src="`+ img +`" height="100px" />`).join('') +
                (post.images.length > 0 ? `<br />`: ``) + 
                html_post(post) +
                html_comment(post) + 
                `<form action="/like" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="postIndex" value="`+ i +`" />
                    <input type="submit" value="`+(post.likes.indexOf(currentUser(req)) > -1 ? 'Dislike' : 'Like')+`">
                </form>
                <form action="/comment" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="postIndex" value="`+ i +`" />
                    <input type="text" name="comment" required />
                    <input type="submit" value="add Comment">
                </form>
            </li>`);
    });

    posttags.push('<ul>');

    let html = fs.readFileSync(__dirname + "/public/post.html").toString();
    html = html.replace('##LOGINUSER##', greetingUser(req));
    html = html.replace('##POSTLIST##', posttags.join(''));

    res.send(html);
});


let uploadImages = (files) => {
    let images = [];

    files.forEach((file, i) => {
        let ext = file.originalname.split('.').pop();
        let name = file.filename + '.' + ext;

        fs.renameSync(file.path, __dirname + '/uploads/' + name);

        images.push('/images/' + name);
    });

    return images;
};

app.post("/thread", upload.array('images', 5), (req, res) => {
    
    const images = uploadImages(req.files);
    const post = new_Post(currentUser(req), req.body.post, images);
    postlist.splice(0, 0, post);

    savePostList();

    res.redirect("/thread");
});

app.post("/like", upload.none(), (req, res) => {
    
    let likes = postlist[+req.body.postIndex].likes;

    if(likes.indexOf(currentUser(req)) === -1) {
        likes.push(currentUser(req));
    } else {
        let idx = likes.indexOf(currentUser(req));
        likes.splice(idx, 1);
    }

    savePostList();

    res.redirect("/thread");
});

app.post("/comment", upload.none(), (req, res) => {

    if(!postlist[+req.body.postIndex]['comments'])
        postlist[+req.body.postIndex]['comments'] = [];

    let comments = postlist[+req.body.postIndex].comments;
    let comment = new_Post(currentUser(req), req.body.comment, '');

    comments.push(comment);

    savePostList();
    
    res.redirect("/thread");
});

app.get('/profile', (req, res) => {

    if( currentUser(req) === undefined ) {
        res.redirect("/");
        return;
    }

    let html = fs.readFileSync(__dirname + "/public/userProfile.html").toString();
    html = html.replace('##LOGINUSER##', greetingUser(req));
    res.send(html);
});

app.post('/changeUserName', upload.none(), (req, res) => {

    if( currentUser(req) === undefined ) {
        res.redirect("/");
        return;
    }
    
    let newName = req.body.username;

    if(userlist.filter(user=> user.username === newName).length > 0) {
        res.send(`You cannot use the username : `+ newName + 
                 `<a href='/changeUserName'/>Go Back</a>&nbsp;<a href='/thread'/>Go Thread</a>`);
    }

    // change postlist
    postlist.forEach(post => {
        if(post.username === currentUser(req))
            post.username = newName;
    });
    savePostList();

    // change userlist
    userlist.forEach(user => {
        if(user.username === currentUser(req))
            user.username = newName;
    });
    saveUserList();

    res.redirect("/logout");
});

app.post("/changeUserColor", upload.none(), (req, res) => {
    
    // change userlist
    userlist.forEach(user => {
        if(user.username === currentUser(req))
            user['color'] = req.body.color;
    });
    saveUserList();

    res.redirect("/thread");
});

app.listen(4000, () => {
    // load userlist
    try {
        let json_userlist = fs.readFileSync(userlist_filename);
        userlist = JSON.parse(json_userlist);

        console.log('userlist loaded');
        console.table(userlist);
    } catch (error) {
        console.warn(`fail to load `+ userlist_filename +` :3`);

        if(fs.existsSync(userlist_filename) === false)
            fs.writeFileSync(userlist_filename, '');
    }

    // load postlist
    try {
        let json_postlist = fs.readFileSync(postlist_filename);
        postlist = JSON.parse(json_postlist);

        console.log('postlist loaded');
        console.table(postlist);
    } catch (error) {
        console.warn(`fail to load `+ postlist_filename +` :3`);
        
        if(fs.existsSync(postlist_filename) === false)
            fs.writeFileSync(postlist_filename, '');
    }
});
