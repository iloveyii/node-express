import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import Condition from "./base/Condition";
import Mongo from "./Mongo";

async function reset_db() {
    const database = new Database("shop");
    const model = await new Mongo(database, "users");
    const condition1: ConditionI = new Condition({where: {}});

    console.log("----------------DELETE------------------");
    console.log((await model.deleteMany(condition1)));
}

reset_db().then(() => process.exit(0));