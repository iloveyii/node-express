import { ResponseT, UserT } from "../../types";
import { ConditionI, ModelI } from "../../interfaces";
import { Database } from "./Database";
import Condition from "./Condition";
import { Validator } from "node-input-validator";


// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Mongo implements ModelI {
    // for response
    _response: ResponseT = {
        success: true,
        data: []
    };

    constructor(protected database: Database, private readonly collection: string, public data: any) {
        console.log("Mongo Collection : ", collection, data);
    }

    // ----------------------------------
    // Implement interface
    // ----------------------------------
    async create(): Promise<any> {
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.insertOne(this.data);
        this.setResponse(
            true,
            model.ops[0]
        );
        return this;
    }

    async read(condition?: ConditionI) {
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.find(condition?.where);
        const arr = await model.toArray();
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
        return this;
    }

    async update(condition: ConditionI) {
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.findOneAndUpdate(condition?.where, {$set: {...this.data}}, {
            upsert: true,
            returnOriginal: false,
        });
        this.setResponse(
            true,
            model.value
        );
        return this;
    }

    async delete(condition: ConditionI) {
        const db = await this.database.db();
        const collection = await db.collection(this.collection);
        const model = await collection.deleteOne(condition?.where);
        if (model.deletedCount > 0) {
            this.setResponse(
                true,
                {
                    id: JSON.parse(JSON.stringify(condition.where))["_id"],
                    message: "Deleted record with condition " + JSON.stringify(condition.where)
                }
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
        console.log("Deleted : ", model.deletedCount);
    }

    // ----------------------------------
    // Class methods
    // ----------------------------------
    setResponse(success: boolean, data: any) {
        // add id from _id
        let newData = [];
        if (!Array.isArray(data)) data = [data];
        newData = data.map((d: any) => {
            if (d._id) {
                d["id"] = d._id;
            }
            return d;
        });
        this._response = {"success": success, "data": newData};
    }

    get response(): ResponseT {
        return this._response;
    }

    rules() {
        return {};
    }

    async validate() {
        const rules = this.rules();
        const validator = new Validator(this.data, rules);
        const matched = await validator.check();
        if (!matched) {
            this.setResponse(false, validator.errors);
            return false;
        }
        this.setResponse(true, validator.errors);
        return true;
    }
}

async function test_db() {
    const database = new Database("shop");
    const user: UserT | undefined = {email: "em@il.com", password: "p@$$w0rd"};
    const model = await new Mongo(database, "users", undefined);
    const condition1: ConditionI = new Condition({where: {email: "em@il.com"}});
    const condition2: ConditionI = new Condition({where: {email: "em@ilupdated.com"}});

    console.log("----------------CREATE------------------");
    console.log((await model.create()).response.data.model);
    console.log("----------------READ------------------");
    console.log((await model.read(condition1)).response.data);
    console.log("----------------UPDATE------------------");
    console.log((await model.update(condition1)).response.data);
    console.log("----------------DELETE------------------");
    console.log((await model.delete(condition2)).response.data);
}


// test_db();

export default Mongo;

// const condition1: ConditionT = {where: {id: "5efbb5673ea71053ac4fc6ba", email: "em@il.com"}};
//
// const c = new Condition("mongodb", condition1);
// console.log(c.get);
