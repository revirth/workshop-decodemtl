let express = require('express')
let multer = require('multer')
let fs = require('fs')

let app = express()
let upload = multer({
    dest: __dirname + '/uploads/'
})

app.use('/images', express.static('uploads'))
let images = []

let lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

let makePage = () => `
    <html>
        <body>
            <h1>imgur</h1>
            <form action="/post" method="POST" enctype="multipart/form-data">
                files: <input type="file" id="funny-image" name="funny-image" onfocus="document.getElementById('url').value=''; " multiple />
                url: <input type="text" id="url" name="url" onfocus="document.getElementById('funny-image').value=''; "/><br/>
                title: <input type="text" name="title" value="what title " />
                description: <input type="text" name="desc" value="`+lorem+`" /><br/>
                <input type="submit" />
            </form>
            <form action="/removeAll" method="POST" enctype="multipart/form-data">
                <input type="submit" value="remove All" />
            </form>

            `+ images.map(img=>`<div style="margin:5px; border: solid 1px red;">
                                    <h2>`+img.title+`</h2><img src="`+img.path+`" height="100px">
                                    <div>`+img.desc+`</div>
                                </div>`).join('') +`
        </body>
    </html>`

app.get("/", (req, res) => {
    console.log("/")

    // fs.readdir(__dirname + '/uploads', (err, files) => {
    //     files.forEach(f=>{ console.log(f); images.push('/images/' + f)});
    // })

    res.send(makePage());
})

app.post("/post", upload.array("funny-image", 2), (req, res) => {

    if(req.files && req.files.length > 0) {
        req.files.forEach((file, i) => {
            
            let ext = file.originalname.split('.').pop()
            let name = file.filename + '.' + ext

            console.log( 'upload file', file );
        
            fs.renameSync(file.path, __dirname + '/uploads/' + name);
        
            images.push({ path: '/images/' + name, title: req.body.title + ' '+ (i+1), desc: req.body.desc + ' '+ (i+1) })
        })
    } else {
        console.log( 'upload url', req.body.url );
    
        images.push({ path: req.body.url, title: req.body.title, desc: req.body.desc })
    }
    
    res.redirect('/')
})

app.post("/removeAll", (req, res) => {
    images = [];

    res.redirect("/");
});

app.listen(4000, () => {
    console.log('server started');
});

