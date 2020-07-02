import { ResponseT, UserT } from "../types";
import { ConditionI, UserI } from "../interfaces";
import { Database } from "./base/Database";
import Condition from "./base/Condition";


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
        data: []
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

    async read(condition?: ConditionI) {
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

    async update(condition: ConditionI, user: any) {
        console.log("Inside update");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.findOneAndUpdate(condition?.where, {$set: {...user}}, {returnNewDocument: true});
        this.setResponse(
            true,
            model.value
        );
        return this;
    }

    async delete(condition: ConditionI) {
        console.log("Inside delete");
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.deleteOne(condition?.where);
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
    const condition1: ConditionI = new Condition("mongodb", {where: {email: "em@il.com"}});
    const condition2: ConditionI = new Condition("mongodb", {where: {email: "em@ilupdated.com"}});

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

// const condition1: ConditionT = {where: {id: "5efbb5673ea71053ac4fc6ba", email: "em@il.com"}};
//
// const c = new Condition("mongodb", condition1);
// console.log(c.get);