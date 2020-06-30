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

const mongo = {
    dbname: "shop",
    url: "mongodb://localhost:27017",
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
};

interface UserI {

    create(user: UserT): Promise<any>;

    read(condition: ConditionT): any;

    update(user: any): any;

    delete(condition: ConditionT): any;
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
    // for dialect
    collection: any = undefined;
    static coll: any = undefined;

    constructor(user?: UserT) {
        this.user = user;
        if (user) this.isNewRecord = true;
    }


// ----------------------------------
// Implement interface
// ----------------------------------
    async create(user: UserT): Promise<any> {
        await this.connect();
        return;
    }

    async read(condition: ConditionT) {
    }

    async update(user: any) {
        await this.connect();

    }

    async delete(condition: ConditionT) {
        await this.connect();
    }

// ----------------------------------
// Object methods
// ----------------------------------

    // Connect to db
    async connect() {
        if (this.collection !== undefined) return this.collection;
        try {
            const client = await MongoClient.connect(mongo.url, mongo.mongoOptions);
            console.log("Mongodb connected to : " + mongo.dbname);
            const db = client.db(mongo.dbname);
            this.collection = db.collection("users");
            Model.coll = this.collection;
        } catch (error) {
            console.log("Error : ", error);
        }
        return this.collection;
    }

    static async Find() {
        if (Model.coll === undefined) {
            console.log("coll is undefined");
            const model = await new Model();
            return await model.connect();
        } else {
            console.log("coll is defined");
        }
        return Model.coll;
    }

    async find(condition: ConditionT) {
        await this.connect();
        const model = await this.collection.find(condition);
        this.data = {
            models: model.toArray()
        };
        return model;
    }

    async insertOne(user: UserT) {
        await this.connect();
        const model = await this.collection.insertOne(user);
        this.data = {
            model: model.ops[0]
        };
        return model;
    }
}

async function test_db() {
    console.log(" static call to Find ", await Model.Find());

    const m = await new Model();
    const models = await m.findAll({});
    await m.create({email: "em2", password: "pass2"});
    console.log(" m : ", m.data);
}


test_db();
