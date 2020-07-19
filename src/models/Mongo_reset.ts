import fs from "fs";
import path from "path";

import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import Condition from "./base/Condition";


async function reset_db() {
    const condition1: ConditionI = new Condition({where: {}});
    const basename = path.basename(__filename);
    const database = new Database("shop");

    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts");
        })
        .forEach(async (file) => {
            const basename = path.parse(file).name;
            const file_path = path.resolve(__dirname, "./" + basename); // Provide relative path
            const Model = await require(file_path).default;
            const model = await new Model(database, undefined);
            model.deleteMany && model.deleteMany(condition1);
        });
}

reset_db().then(() => {
    console.log("Mongo DB reset complete");
});
