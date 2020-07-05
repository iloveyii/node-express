import { ConditionI, ModelI } from "../../interfaces";
import Condition from "./Condition";
import { ResponseT, UserT } from "../../types";

const Model = require("../../../sequelize/src/models/index").User;


// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Sequelize implements ModelI {
    user: UserT | undefined = undefined;
    // for response
    _response: ResponseT = {
        success: true,
        data: []
    };

    constructor() {
        console.log("Initialized Sequelize constructor");
    }

    // ----------------------------------
    // Implement interface
    // ----------------------------------
    async create(user?: UserT): Promise<any> {
        const model = await Model.create(user);
        this.setResponse(
            true,
            model.dataValues
        );
        console.log("Inside create", model.dataValues);
        return this;
    }

    async read(condition?: ConditionI): Promise<any> {
        if (condition) {
            console.log("condition ", condition, condition.where);
            const model = await Model.findOne(condition.where);
            if (model) { // found
                this.setResponse(
                    true,
                    model.dataValues
                );
            } else {
                this.setResponse(
                    false,
                    `No record found with condition ${JSON.stringify(condition.where)}`
                );
            }

        } else {
            const models = await Model.findAll();
            this.setResponse(
                true,
                models.map((model: any) => model.dataValues)
            );
        }
        console.log("Inside read", this.response);
        return this;
    }

    async update(condition: ConditionI, user?: any): Promise<any> {
        const model = await Model.findOne(condition.where);
        const status = model && await model.update(user);

        if (status) {
            this.setResponse(
                true,
                model.dataValues
            );
        } else {
            this.setResponse(
                false,
                "Error"
            );
        }
        console.log("Inside update");
        return this;
    }

    async delete(condition: ConditionI): Promise<any> {
        const status = await Model.destroy(condition.where);
        if (status > 0) {
            this.setResponse(
                true,
                `User with the given condition is deleted successfully, ` + JSON.stringify(condition)
            );
        } else {
            this.setResponse(
                false,
                `User with the given condition does not exist, ` + JSON.stringify(condition)
            );
        }
        console.log("Inside delete");
        return this;
    }

    // ----------------------------------
    // Class methods
    // ----------------------------------
    setResponse(success: boolean, data: any) {
        this._response = {success, data: Array.isArray(data) ? data : [data]};
    }

    get response(): ResponseT {
        return this._response;
    }
}


// ----------------------------------
// Test Drive
// ----------------------------------
async function test_db() {
    const user: UserT | undefined = {email: "em@il.com", password: "p@$$w0rd"};
    const model = await new Sequelize();
    const condition2: ConditionI = new Condition({where: {email: "em@ilupdated.com"}});
    const condition1: ConditionI = new Condition({where: {email: "em@il.com"}});

    console.log("----------------CREATE----------------");
    console.log((await model.create(user)).response);
    console.log("----------------READ------------------");
    console.log((await model.read(condition1)).response);
    console.log("----------------UPDATE------------------");
    console.log((await model.update(condition1, condition2)).response);
    console.log("----------------DELETE------------------");
    console.log((await model.delete(condition2)).response);
}


// test_db();

export default Sequelize;