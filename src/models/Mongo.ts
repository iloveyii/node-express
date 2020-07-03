import { ResponseT, UserT } from "../types";
import { ConditionI, ModelI } from "../interfaces";
import { Database } from "./base/Database";
import Condition from "./base/Condition";


// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Mongo implements ModelI {
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
        console.log(condition?.where);
        const model = await collection.find(condition?.where);
        const arr = await model.toArray();
        console.log("inside Mongo read ", arr);
        if (arr.length > 0) {
            this.setResponse(
                true,
                arr
            );
        } else {
            this.setResponse(
                false,
                ["No record found with condition " + JSON.stringify(condition?.where)]
            );
        }
        console.log("Inside mongo " + this.response);
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
        console.log("delete", model.deletedCount);
        if (model.deletedCount > 0) {
            this.setResponse(
                true,
                "Deleted record with condition " + JSON.stringify(condition.where)
            );
        } else {
            this.setResponse(
                false,
                "Cannot delete record with condition " + JSON.stringify(condition.where)
            );
        }
        return this;
    }

    async deleteMany(condition: ConditionI) {
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.deleteMany(condition?.where);
        console.log("deleted : ", model.deletedCount);
    }

    // ----------------------------------
    // Class methods
    // ----------------------------------
    setResponse(success: boolean, data: any) {
        // add id from _id
        console.log("data", data);
        let newData = [];
        if (success === true) {
            if (!Array.isArray(data)) data = [data];
            newData = data.map((d: any) => {
                if (d._id) {
                    d["id"] = d._id;
                }
                return d;
            });
        }
        this._response = {success, data: newData};
    }

    get response(): ResponseT {
        return this._response;
    }
}

async function test_db() {
    const database = new Database("shop");
    const user: UserT | undefined = {email: "em@il.com", password: "p@$$w0rd"};
    const model = await new Mongo(database, "users");
    const condition1: ConditionI = new Condition({where: {email: "em@il.com"}});
    const condition2: ConditionI = new Condition({where: {email: "em@ilupdated.com"}});

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