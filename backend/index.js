const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// connect database

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@products.6aa06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("online_shop").collection("products");

  //get products api
  app.get("/products", (req, res) => {
    collection.find({}).toArray((err, result) => {
      err ? res.send(err) : res.send({ count: result.length, result });
    });
  });

  //   get specific products
  app.get("/products/:id", (req, res) => {
    collection.findOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
      err ? res.status(500).send(err) : res.send(result);
    });
  });

  // perform actions on the collection object
  err ? console.log(err) : console.log("Connected to Database");
  //   client.close();
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
