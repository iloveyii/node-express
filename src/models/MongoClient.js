const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("db1");

    // find all
    dbo.collection("products").find({}, {projection: {_id: 1, name: 1}}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    // find one
    dbo.collection("products").find({name: 'proudct 86'}, {
        projection: {
            _id: 1,
            name: 1
        }
    }).toArray(function (err, result) {
        if (err) throw err;
        console.log('find one', result);
    });

    // create one
    // dbo.collection("products").insertOne({name: 'inserted 1'}, function (err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted with id : ", res.insertedId);
    // });

    // create many
    // dbo.collection("products").insertMany([
    //     {name: 'inserted 1'},
    //     {name: 'inserted 11'},
    //     {name: 'inserted 12'},
    //     {name: 'inserted 13'},
    //     ], function (err, res) {
    //     if (err) throw err;
    //     console.log( Object.keys(res.insertedIds).length + " document inserted with ids : ", res.insertedIds);
    // });


    // Update
    dbo.collection("customers").updateOne({_id: ('5ef9c8fbdc06d45a5ac9fcd6')}, {$set: {name: 'Updated Product 1'}}, {upsert: true}, function (err, res) {
        if (err) throw err;
        console.log("1 document updated", res.modifiedCount);
        db.close();
    });

});