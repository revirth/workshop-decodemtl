let express = require("express");
let app = express();
let fs = require("fs");
let upload = require("multer")({
  dest: __dirname + "/uploads/"
});
app.use("/images", express.static("uploads"));

let cookieParser = require("cookie-parser");
let cors = require("cors");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

let passwords = { a: "b", b: "c" };
let messages = [];
let sessions = {};

let generateId = () => "" + Math.floor(Math.random() * 100000000);

let login = username => {
  let sessionId = generateId();
  sessions[sessionId] = username;

  console.log("TCL: /login -> sessionId", sessionId, sessions);

  return sessionId;
};

app.post("/signup", upload.none(), (req, res) => {
  console.log("TCL: /signup", req.body);

  if (passwords[req.body.username]) {
    res.send({
      success: false,
      message: `'${req.body.username}' is already used`
    });
    return;
  }

  passwords[req.body.username] = req.body.password;
  console.log("TCL: /signup -> passwords", passwords);

  let sessionId = login(req.body.username);
  res.cookie("sid", sessionId);

  res.send({ success: true });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("TCL: /login", req.body);
  if (
    passwords[req.body.username] &&
    passwords[req.body.username] === req.body.password
  ) {
    let sessionId = login(req.body.username);

    if (req.body["rememberme"]) {
      var min = 1000 * 60;

      res.cookie("sid", sessionId, { maxAge: min * 5 });
    } else res.cookie("sid", sessionId);

    let loginUsers = Object.values(sessions).filter(
      name => name !== req.body.username
    );

    res.send({ success: true });
    return;
  }
  res.send({
    success: false,
    message: `Username or password is not valid.\n\nTry again please.`
  });
});

app.get("/loginUsers", (req, res) => {
  let username = sessions[req.cookies.sid];
  let loginUsers = Object.values(sessions).filter(name => name !== username);

  console.log("TCL: /loginUsers", loginUsers);

  res.send(loginUsers);
});

app.get("/rememberme", (req, res) => {
  console.log("TCL: /rememberme", req.cookies["sid"]);

  let sessionId = req.cookies["sid"];
  if (sessions[sessionId]) res.cookie("sid", sessionId);
  else {
    res.send({ success: false });
    return;
  }

  res.send({ success: true });
});

app.get("/logout", upload.none(), (req, res) => {
  delete sessions[req.cookies.sid];

  console.log("TCL: /logout", req.cookies.sid, "->", sessions);

  res.clearCookie("sid");

  res.send({ success: true });
});

app.post("/message", upload.array("images", 2), (req, res) => {
  console.log("TCL: /message", req.body, req.cookies);

  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let images = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((file, i) => {
      let ext = file.originalname.split(".").pop();
      let name = `${file.filename}.${ext}`;

      fs.renameSync(file.path, `${__dirname}/uploads/${name}`);

      images.push(`/images/${name}`);
    });
  }

  let message = {
    username: username,
    message: req.body.message,
    time: new Date(),
    images: images
  };

  if (username === undefined) {
    res.send({ success: false, message: "You have to login first" });
    return;
  }

  messages.push(message);

  io.emit("public", message);

  console.log("TCL: /message -> messages", messages);

  res.send({ success: true });
});

app.get("/messages", (req, res) => {
  console.log("TCL: /messages", req.cookies.sid);

  res.send(
    messages
      .slice()
      .reverse()
      .slice(0, 21)
  );
});

app.post("/deleteAll", (req, res) => {
  let username = sessions[req.cookies.sid];

  messages = messages.filter(msg => msg.username !== username);

  io.emit("public", messages);

  res.send({ success: true });
});

// app.listen(4000);

// SOCKET IO https://socket.io/get-started/chat
var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", socket => {
  socket.on("public", (msg, sid, fn) => {
    // console.log("message: " + msg);

    let sessionId = sid;
    let username = sessions[sessionId];
    let message = {
      username: username,
      message: msg,
      time: new Date()
    };

    if (username === undefined) {
      res.send({ success: false, message: "You have to login first" });
      return;
    }

    messages.push(message);
    console.table(messages);

    fn(message);
    io.emit("public", message);
  });
});

http.listen(4000, function() {
  console.log("listening on *:4000");
});
