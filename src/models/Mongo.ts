import { MongoClient } from "mongodb";

type ConditionT = {
    where?: any;
};

type UserT = {
    id?: string | number;
    email: string;
    password: string
};

type ResultT = {
    success: boolean;
    data: UserT;
};

export type ResponseT = {
    success: boolean
    data: any,
};


const mongo = {
    dbname: "shop",
    url: "mongodb://localhost:27017",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
};

interface UserI {

    create(user: UserT): Promise<any>;

    read(condition: ConditionT): any;

    update(condition: ConditionT, user: any): any;

    delete(condition: ConditionT): any;
}


export class Database {
    private database: any = undefined;

    constructor(private dbname: string) {
    }

    async connect() {
        if (this.database !== undefined) return this.database;
        try {
            const client = await MongoClient.connect(mongo.url, mongo.mongoOptions);
            console.log("Mongodb connected to : " + this.dbname);
            this.database = await client.db(mongo.dbname);
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

// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Mongo implements UserI {
    isNewRecord: boolean = true;
    user: UserT | undefined = undefined;
    // for response
    success: boolean = true;
    data: any = undefined;
    // db connection to mongo
    db: any = undefined;
    _response: ResponseT = {
        success: true,
        data: undefined
    };

    constructor(private database: Database, private collection: string) {
    }


// ----------------------------------
// Implement interface
// ----------------------------------
    async create(user: UserT): Promise<any> {
        console.log("Inside create");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.insertOne(user);
        this.setResponse(
            true,
            model.ops[0]
        );
        console.log("Inside create");
        return this;
    }

    async read(condition?: ConditionT) {
        console.log("Inside read");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.find(condition?.where);
        this.setResponse(
            true,
            await model.toArray()
        );
        console.log(this.data);
        return this;
    }

    async update(condition: ConditionT, user: any) {
        console.log("Inside update");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.findOneAndUpdate(condition.where, {$set: {...user}}, {returnNewDocument: true});
        this.setResponse(
            true,
            model.value
        );
        return this;
    }

    async delete(condition: ConditionT) {
        console.log("Inside delete");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.deleteOne(condition.where);
        this.setResponse(
            true,
            model.deletedCount
        );
        return this;
    }

    // ----------------------------------
    // Class methods
    // ----------------------------------
    setResponse(success: boolean, data: any) {
        this._response = {success, data};
    }

    get response(): ResponseT {
        return this._response;
    }
}

async function test_db() {
    const database = new Database("shop");
    const user: UserT | undefined = {email: "em@il.com", password: "p@$$w0rd"};
    const model = await new Mongo(database, "users");
    const condition1: ConditionT = {where: {email: "em@il.com"}};
    const condition2: ConditionT = {where: {email: "em@ilupdated.com"}};

    console.log("----------------CREATE------------------");
    console.log((await model.create(user)).data.model);
    console.log("----------------READ------------------");
    console.log((await model.read(condition1)).data.model);
    console.log("----------------UPDATE------------------");
    console.log((await model.update(condition1, condition2)).data);
    console.log("----------------DELETE------------------");
    console.log((await model.delete(condition2)).data);


}


// test_db();

export default Mongo;
