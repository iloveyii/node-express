const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("db1");

    dbo.collection("products").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});