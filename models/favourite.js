const { getDb } = require("../utils/database");


module.exports = class favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }
  save() {
    const db = getDb();
    return db.collection('favourites').findOne({ houseId: this.houseId }).then(existingFav => {
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
    
  }
  static getFavourites() {
     const db = getDb();
     return db.collection("favourites").find().toArray();
  }
  static deleteById(delhomeId) {
    const db = getDb();
        return db
          .collection("favourites")
          .deleteOne({ houseId: delhomeId });
      }
};

