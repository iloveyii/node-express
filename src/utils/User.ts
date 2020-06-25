import jwt from "jsonwebtoken";
import Verify from "./Token";
import Token from "./Token";

const Model = require("../../sequelize/src/models").User;

type UserT = {
    id?: number;
    email: string;
    password: string;
};

type StatusT = {
    user: UserT | UserT[],
    users?: any[],
    success: boolean
};

interface UserI {
    isNewRecord: boolean;

    create(user: UserT): any;

    readOne(id: number): any;

    readAll(): any;

    update(): any;

    delete(id: number): any;
}


class User implements UserI {
    isNewRecord: boolean = true;
    id: number = 0;
    // for response
    success: boolean = true;
    data: any = undefined;


    constructor(private req: any) {
        if (req.params && req.params.id) {
            this.id = req.params.id;
        }
    }

    login() {

    }

    authenticate() {

    }

    async create(user: UserT) {
        return await Model.create({...user});
    }

    async readOne(id: number) {
        return await Model.findOne({where: {id}});
    }

    async readAll() {
        return await Model.findAll();
    }

    async update() {
        const user: UserT = {email: this.req.body.user.email, password: this.req.body.user.password};
        const model = await Model.findOne({where: {id: this.req.params.id}});
        // Verify if same id user
        const status = await Token.isVerified(this.req) && model && await model.update({...user});
        if (status) {
            this.success = true;
            this.data = model.dataValues;
        } else {
            this.success = false;
            this.data = await Token.info(this.req);
        }
    }

    get Success() {
        return this.success;
    }

    get Data() {
        return this.data;
    }

    async delete() {
        if (await Token.isVerified(this.req)) {
            const status = await Model.destroy({where: {id: this.id}});
            if (status > 0) {
                this.success = true;
                this.data = `User with id ${this.id} is deleted`;
            } else {
                this.success = false;
                this.data = `User with id ${this.id} does not exist`;
            }
        } else {
            this.success = false;
            this.data = await Token.info(this.req);
        }
    }

}

export default User;