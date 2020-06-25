import jwt from "jsonwebtoken";
import Verify from "./Token";
import Token from "./Token";
import bcrypt from "bcrypt";

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

    create(): any;

    update(): any;

    delete(id: number): any;
}


class User implements UserI {
    isNewRecord: boolean = true;
    user: UserT | undefined = undefined;
    id: number = 0;
    // for response
    success: boolean = true;
    data: any = undefined;


    constructor(private req: any) {
        if (req.params && req.params.id) {
            this.id = req.params.id;
        }
        this.user = {email: this.req.body?.user.email, password: this.req.body?.user.password};
    }

    get Success() {
        return this.success;
    }

    get Data() {
        return this.data;
    }

    login() {

    }

    authenticate() {

    }

    // CRUD
    async create() {
        const model = await Model.findOne({where: {email: this.req.body.user.email}});
        if (model) {
            this.success = false;
            this.data = "Email already registered";
        } else {
            const hashedPassword = await bcrypt.hash(this.user?.password, 10);
            const user: any = await Model.create({email: this.user?.email, password: hashedPassword});
            this.success = true;
            this.data = user;
        }
    }

    public static async read(condition: any = undefined) {
        if (condition) {
            return await Model.findOne({where: condition.where});
        }
        return await Model.findAll();
    }

    async update() {
        const model = await Model.findOne({where: {id: this.req.params.id}});
        // Verify if same id user
        const status = await Token.isVerified(this.req) && model && await model.update({...this.user});
        if (status) {
            this.success = true;
            this.data = model.dataValues;
        } else {
            this.success = false;
            this.data = await Token.info(this.req);
        }
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