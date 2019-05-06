const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
//PASTE YOUR MLAB URI STRING HERE
const url = "mongodb+srv://admin:P@ssw0rd@cluster0-ofspz.mongodb.net/test";

app.use(bodyParser.raw({ type: "*/*" }));

//Here we will insert new posts into our database
//when we send back our response, we can send it
//in this format:
//{status: true, message:'Success!'}
app.post("/postReview", (req, res) => {
  let review = JSON.parse(req.body);

  console.log("TCL: /postReview", review);

  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    let dbo = db.db("mongo-workshop");

    dbo.collection("reviews").insertOne(review, (err, result) => {
      if (err) throw err;

      res.send({ status: true, message: "Reviews uploaded" });
    });

    db.close();
  });
});

//Here will get all reviews to display them on
//the frontend. We are going to respond with
//an object in this format:
//{status:true, reviews:[array of reviews]}
app.get("/getReviews", (req, res) => {
  console.log("TCL: / getReviews", req.body);

  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    let dbo = db.db("mongo-workshop");

    dbo
      .collection("reviews")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;

        res.send({ status: true, reviews: result });
      });

    db.close();
  });
});

app.post("/getReviews", (req, res) => {
  let search = JSON.parse(req.body);

  console.log("TCL: /getReviews", search);

  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    let dbo = db.db("mongo-workshop");

    dbo
      .collection("reviews")
      .find(search)
      .toArray((err, result) => {
        if (err) throw err;

        res.send({ status: true, reviews: result });
      });

    db.close();
  });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
