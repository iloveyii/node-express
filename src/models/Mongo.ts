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

    findOne(condition: ConditionT): any;

    findAll(condition: ConditionT): any;

    create(user: UserT): any;

    update(user: any): any;

    delete(condition: ConditionT): any;
}

class Model implements UserI {
    isNewRecord: boolean = true;
    user: UserT | undefined = undefined;
    // for response
    success: boolean = true;
    data: any = undefined;
    // for dialect
    collection: any = undefined;

    constructor(user?: UserT) {
        this.user = user;
        if (user) this.isNewRecord = true;
    }

    // Connect to db
    async connect() {
        if (this.collection !== undefined) return this.collection;
        try {
            const client = await MongoClient.connect(mongo.url, mongo.mongoOptions);
            console.log("Mongodb connected to : " + mongo.dbname);
            const db = client.db(mongo.dbname);
            this.collection = db.collection("users");
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    async findOne(condition: ConditionT) {
        await this.connect();
        const model = await this.collection.find(condition);
        this.data = {
            model: model.toArray()
        };
        return model;
    }

    async findAll(condition: ConditionT) {
        await this.connect();
        console.log('"this data : ', this.data);
        const model = await this.collection.find(condition);
        this.data = {
            models: await model.toArray()
        };
        console.log('"this data : ', this.data);
        return model;
    }

    async create(user: UserT) {
        await this.connect();
        const model = await this.collection.insertOne(user);
        this.data = {
            model: model.ops[0]
        };
        return model;
    }

    async update(user: any) {
        await this.connect();

    }

    async delete(condition: ConditionT) {
        await this.connect();
    }
}


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


async function test_db() {
    const m = await new Model();
    await m.findAll({});
    await m.create({email: "em2", password: "pass2"});
    console.log(" m : ", m.data);
}


test_db();
