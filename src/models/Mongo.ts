import { MongoClient } from "mongodb";


// Defining schema interface
interface UserSchema {
    _id: { $oid: string };
    username: string;
    password: string;
}

// const db = client.database("test");
// const users = db.collection<UserSchema>("users");

const mongo = {
    dbname: "shop",
    url: "mongodb://localhost:27017",
    mongoOptions: {useNewUrlParser: true},
};


function connect() {
    MongoClient.connect(mongo.url, mongo.mongoOptions, (err: any, client: any) => {
        if (err) {
            console.log("Error : ", err);
        } else {
            console.log("Mongodb connected to : " + mongo.dbname);
            const db = client.db(mongo.dbname);
            const collection = db.collection("users");
            collection.insert({email: "em@ail.com", password: "a b c d e"}, (err: any, result: any) => {
                if (err) throw err;
                console.log(result);
            });
        }
    });
}

connect();

