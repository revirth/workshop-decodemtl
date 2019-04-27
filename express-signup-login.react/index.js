let express = require("express");
let path = require("path");
let multer = require("multer");
let app = express();
let upload = multer();
let fs = require("fs");

let users = [];
let user_json = "user_data.json";

try {
  if (!fs.existsSync(user_json)) fs.writeFileSync(user_json, users);
  else {
    let strUsers = fs.readFileSync(user_json);
    users = JSON.parse(strUsers);
  }

  console.info("TCL: -> Successfully load user data");
  console.table(users);
} catch (error) {
  console.error(error);
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

app.post("/api/signup", upload.none(), (req, res) => {
  debugger;

  console.log("TCL: '/api/signup'", req.body);

  if (users.filter(u => u.username === req.body.username).length > 0) {
    res.send(500, `${req.body.username} is already exist`);
    // TODO: express deprecated res.send(status, body): Use res.status(status).send(body) instead

    return;
  }

  users.push({
    username: req.body.username,
    password: req.body.password,
    tryLogin: 0
  });
  fs.writeFileSync(user_json, JSON.stringify(users));

  res.send(200, { success: true });
});

//
const port = process.env.PORT || 5000;
app.listen(port);
console.log("App is listening on port " + port);

function wrapAsync(fn) {
  return function(req, res, next) {
    // 모든 오류를 .catch() 처리하고 체인의 next() 미들웨어에 전달하세요
    // (이 경우에는 오류 처리기)
    fn(req, res, next).catch(next);
  };
}
