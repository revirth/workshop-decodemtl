let express = require("express");
let multer = require("multer");
let app = express();
let upload = multer();
let fs = require("fs");

let users = [];
let User = (id, pass) => ({ username: id, password: pass, tryLogin: 0 });

let userFile = "passwords.json";
try {
  let fileContents = fs.readFileSync(userFile);
  users = JSON.parse(fileContents);
} catch (error) {}

app.use("/", express.static(__dirname + "/public"));

app.post("/signup", upload.none(), (req, res) => {
  console.log(req.body);

  if (users.filter(u => u.username === req.body.username).length > 0) {
    res.send(req.body.username + ` is already used <a href="/signup.html" />Try Again</a>`);
    return;
  }

  users.push(User(req.body.username, req.body.password));
  fs.writeFileSync(userFile, JSON.stringify(users));

  res.send(`signup successful <a href="/login.html" />Login</a>`);
});

findUserByName = username => users.filter(u => u.username === username)[0];

app.post("/login", upload.none(), function(req, res) {
  console.log(req.body);

  let user = findUserByName(req.body.username);

  if (user) {
    console.log(user);

    if (user.password === req.body.password) {
      user.tryLogin = 0;
      res.send("login successful");
      return;
    } else if (user.tryLogin === 3) {
      res.send(`your account is blocked. <a href="/login.html" />Try Again</a>`);
      return;
    } else {
      user.tryLogin++;
      res.send(`password is invalid <a href="/login.html" />Try Again</a>`);
      return;
    }
  }

  res.send(`invalid username or password <a href="/login.html" />Try Again</a>`);
});

app.listen(4000);
