import { MongoClient, ObjectId } from "mongodb";


const mongo = {
    url: "mongodb://localhost:27017",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
};

export class Database {
    private database: any = undefined;

    constructor(private dbname: string) {
    }

    async connect() {
        if (this.database !== undefined) return this.database;
        try {
            const client = await MongoClient.connect(mongo.url, mongo.mongoOptions);
            console.log("Mongodb connected to : " + this.dbname);
            this.database = await client.db(this.dbname);
        } catch (error) {
            console.log("Error : ", error);
        }
        return this.database;
    }

    async db() {
        await this.connect();
        return this.database;
    }
}