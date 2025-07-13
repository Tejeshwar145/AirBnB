const {getDb}=require('../utils/database')
const { ObjectId } = require('mongodb');
module.exports = class Home {
  constructor(housename, price, rating, imageurl, description, _id) {
    this.housename = housename;
    this.price = price;
    this.rating = rating;
    this.imageurl = imageurl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {//update
      const updateFields = { housename:this.housename, price:this.price, rating:this.rating, imageurl:this.imageurl, description:this.description };
       return db.collection("homes").updateOne({_id: new ObjectId(String(this._id))},{$set:updateFields});
    }
    else {
      return db.collection("homes").insertOne(this);
    }
    
  }


  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db.collection("homes").find({_id: new ObjectId(String(homeId))}).next();
  }
  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
