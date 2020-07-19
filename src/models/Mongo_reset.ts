import fs from "fs";
import path from "path";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import Condition from "./base/Condition";
import User from "./User";


async function reset_db() {
    const database = new Database("shop");
    const model = await new User(database, undefined);
    const condition1: ConditionI = new Condition({where: {}});

    console.log("----------------DELETE------------------");
    console.log((await model.deleteMany(condition1)));

    const basename = path.basename(__filename);
    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts");
        })
        .forEach(async (file) => {
            const basename = path.parse(file).name;
            console.log(basename);
            const Model = await import("./" + basename);
            console.log(typeof Model);
            const model = await new Model(database, undefined);
            const deleted = await model.deleteMany(condition1);
            console.log(basename, deleted);
        });
}

reset_db().then(() => {
    console.log("Mongo DB reset complete");
    process.exit(0);
});
