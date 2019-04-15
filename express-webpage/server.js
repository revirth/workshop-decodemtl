let express = require("express");
let app = express();
let count = 0;
let visitedTime = () => count + (count > 1 ? " times" : " time");
let port = 3000;

app.get("/count", function(req, res) {
  count++;

  console.log("TCL: /count", count);
  res.send("<h1>This page has been visited " + visitedTime() + "</h1>");
});
app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log("... Server has started at port :", port);
});
