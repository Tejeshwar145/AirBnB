const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://shivatejaarva:Shiva123@shiva.j7tli7t.mongodb.net/";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error while connection to MongoDB", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
