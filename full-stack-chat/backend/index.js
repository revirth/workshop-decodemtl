let express = require("express");
let multer = require("multer");
let cookieParser = require("cookie-parser");
let cors = require("cors");

let app = express();
let upload = multer();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

let passwords = { a: "b" };
let messages = [];
let sessions = {};

let generateId = () => "" + Math.floor(Math.random() * 100000000);

app.post("/signup", upload.none(), (req, res) => {
  console.log("TCL: /signup", req.body);

  passwords[req.body.username] = req.body.password;

  console.log("TCL: /signup -> passwords", passwords);

  res.send({ success: true });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("TCL: /login", req.body);
  if (
    passwords[req.body.username] &&
    passwords[req.body.username] === req.body.password
  ) {
    let sessionId = generateId();
    sessions[sessionId] = req.body.username;

    console.log("TCL: /login -> sessionId", sessionId, sessions);

    res.cookie("sid", sessionId);

    res.send({ success: true });
    return;
  }
  res.send({ success: false });
});

app.get("/logout", upload.none(), (req, res) => {
  console.log("TCL: /logout", req.cookies.sid);

  delete sessions[req.cookies.sid];

  console.log("TCL: /logout -> sessions", sessions);

  res.clearCookie("sid");

  res.send({ success: true });
});

app.post("/message", upload.none(), (req, res) => {
  console.log("TCL: /message", req.body, req.cookies);

  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let message = req.body.message;

  messages.push({ username: username, message: message });

  console.log("TCL: /message -> messages", messages);

  res.send({ success: true });
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.listen(4000);
