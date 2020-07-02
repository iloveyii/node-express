import { MongoClient, ObjectId } from "mongodb";


const mongo = {
    url: "mongodb://localhost:27017",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
};

export class Database {
    static database: any = undefined;

    constructor(private dbname: string) {
    }

    async connect() {
        if (Database.database !== undefined) return Database.database;
        try {
            const client = await MongoClient.connect(mongo.url, mongo.mongoOptions);
            console.log("Mongodb connected to : " + this.dbname);
            Database.database = await client.db(this.dbname);
        } catch (error) {
            console.log("Error : ", error);
        }
        return Database.database;
    }

    async db() {
        await this.connect();
        return Database.database;
    }
}