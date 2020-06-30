const Model = require("../../sequelize/src/models/index").User;


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


interface UserI {

    create(user: UserT): Promise<any>;

    read(condition: ConditionT): Promise<any>;

    update(condition: ConditionT, user: any): Promise<any>;

    delete(condition: ConditionT): Promise<any>;
}


// --------------------------------------------------------------
// Mongo base class - It will create any document of TypeT given
// --------------------------------------------------------------
class Sequelize implements UserI {
    user: UserT | undefined = undefined;
    // for response
    _response: ResponseT = {
        success: true,
        data: undefined
    };

    constructor() {
    }

    // ----------------------------------
    // Implement interface
    // ----------------------------------
    async create(user: UserT): Promise<any> {
        const model = await Model.create(user);
        this.setResponse(
            true,
            model
        );
        console.log("Inside create");
        return this;
    }

    async read(condition?: ConditionT) {
        let users;
        if (condition) {
            users = await Model.findAll();
        } else {
            users = await Model.findOne(condition);
        }
        this.setResponse(
            true,
            users
        );

        console.log("Inside read");
        return this;
    }

    async update(condition: ConditionT, user: any) {
        const model = await Model.findOne(condition);
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

    async delete(condition: ConditionT) {
        const status = await Model.destroy(condition);
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
        this._response = {success, data};
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
    const condition2: ConditionT = {where: {email: "em@ilupdated.com"}};
    const condition1: ConditionT = {where: {email: "em@il.com"}};

    console.log("----------------CREATE----------------");
    console.log((await model.create(user)).response);
    console.log("----------------READ------------------");
    console.log((await model.read(condition1)).response);
    console.log("----------------UPDATE------------------");
    console.log((await model.update(condition1, condition2)).response);
    console.log("----------------DELETE------------------");
    console.log((await model.delete(condition2)).response);
}


test_db();
