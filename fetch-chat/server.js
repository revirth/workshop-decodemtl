let express = require("express");
let app = express();
let fs = require("fs");
let cookieParser = require("cookie-parser");
let multer = require("multer");
let upload = multer({
  dest: __dirname + "/upload/"
});

// app
app.use(cookieParser());
app.use("/static", express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/upload"));

// user
let sessions = {};
let passwordsAssoc = { a: "b", b: "c", c: "d" };
let colors = {};
let randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return [r.toString(16), g.toString(16), b.toString(16)].join("");
};
Object.keys(passwordsAssoc).forEach(
  user => (colors[user] = "#" + randomColor())
);

// chat
let messages = [];
let chatRoomList = ["chatroom#1"];

////////////////////////////////////////////////////////////////////////////////
// UTIL
////////////////////////////////////////////////////////////////////////////////

let logPostReq = req =>
  console.log(new Date(), req.path, sessions[req.cookies["sid"]], req.body);

////////////////////////////////////////////////////////////////////////////////
// index.html
////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send(fs.readFileSync(__dirname + "/public/index.html").toString());
});

app.post("/signup", upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  passwordsAssoc[username] = password;
  res.send("<html><body> signup successful </body></html>");
});
app.post("/login", upload.none(), (req, res) => {
  let username = req.body.username;
  let passwordGiven = req.body.password;
  let expectedPassword = passwordsAssoc[username];
  if (expectedPassword !== passwordGiven) {
    res.send("<html><body> invalid username or password </body></html>");
    return;
  }

  if (!Object.values(sessions).includes(username)) {
    let sid = Math.floor(Math.random() * 10000000);
    sessions[sid] = username;
    res.cookie("sid", sid);
    res.cookie("unm", username);
  }

  res.redirect("/chat");
});

// LOGIN CHECK
app.use("*", (req, res, next) => {
  if (sessions[req.cookies["sid"]] === undefined) {
    res.redirect("/");
    return;
  }

  // TODO: refresh active user list

  next();
});

////////////////////////////////////////////////////////////////////////////////
// chat.html
////////////////////////////////////////////////////////////////////////////////

app.get("/chat", (req, res) => {
  res.send(fs.readFileSync(__dirname + "/public/chat.html").toString());
});

let uploadImages = files => {
  let images = [];

  files.forEach((file, i) => {
    let ext = file.originalname.split(".").pop();
    let name = file.filename + "." + ext;

    fs.renameSync(file.path, __dirname + "/upload/" + name);

    images.push("/images/" + name);
  });

  return images;
};
app.get("/messages/:idx", (req, res) => {
  // console.log("Sending back the public messages");

  let msgs = messages
    .filter(m => m.to === "" && m.chatroom === req.params.idx)
    .reverse();

  res.send(JSON.stringify(msgs));
});
app.post("/messages", upload.array("images", 5), (req, res) => {
  logPostReq(req);

  if (sessions[req.cookies["sid"]] === undefined) {
    res.redirect("/");
    return;
  }

  let images = uploadImages(req.files);

  messages.push({
    user: sessions[req.cookies["sid"]],
    msg: req.body.message,
    to: req.body["target-user"],
    images: images,
    chatroom: req.body.chatroom
  });

  res.send({ success: true });
});

app.get("/directMessages", (req, res) => {
  // console.log('Sending back the direct messages')

  if (sessions[req.cookies["sid"]])
    res.send(
      messages.filter(m => m.to === sessions[req.cookies["sid"]]).reverse()
    );
  else res.send([]);
});

app.post("/changeName", upload.none(), (req, res) => {
  logPostReq(req);

  let newName = req.body.username;

  if (passwordsAssoc[newName]) {
    res.send({ success: false });
    return;
  }

  let oldName = sessions[req.cookies["sid"]];
  let oldPass = passwordsAssoc[oldName];

  messages.forEach(m => {
    if (m.user === oldName) m.user = newName;
  });

  delete passwordsAssoc[oldName];
  passwordsAssoc[newName] = oldPass;

  sessions[req.cookies["sid"]] = newName;
  res.send({ success: true });
});

app.post("/changeColor", upload.none(), (req, res) => {
  logPostReq(req);

  colors[sessions[req.cookies["sid"]]] = req.body.color;

  res.send({ success: true });
});

app.get("/activeUsers", (req, res) => {
  let activeUsers = [];

  Object.values(sessions).forEach(u => {
    activeUsers.push({
      name: u,
      color: colors[u]
    });
  });

  res.send(activeUsers);
});
app.get("/allUsers", (req, res) => {
  res.send(
    Object.keys(passwordsAssoc).filter(u => u !== sessions[req.cookies["sid"]])
  );
});

// chat room
app.get("/chatroomlist", (req, res) => {
  res.send(chatRoomList);
});
app.post("/createChatRoom", upload.none(), (req, res) => {
  logPostReq(req);

  if (chatRoomList.indexOf(req.body.roomname) > -1) {
    res.send({ success: false });
    return;
  }

  chatRoomList.push(req.body.roomname);
  res.send({ success: true });
});

app.listen(4000);
