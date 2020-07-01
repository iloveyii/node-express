import Token from "./Token";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Mongo, { Condition, Database } from "./Mongo";

const Model = require("../../sequelize/src/models/index").User;

type UserT = {
    id?: number;
    email: string;
    password: string;
};

export type ResponseT = {
    success: boolean
    data: any,
};

interface UserI {
    isNewRecord: boolean;

    create(): any;

    read(): any;

    update(): any;

    delete(): any;
}


// @todo make it general Model between controller and specific model

class User implements UserI {
    model: any = undefined;
    isNewRecord: boolean = true;
    user: UserT | undefined = undefined;
    id: number = 0;
    // for response
    success: boolean = true;
    data: any = undefined;
    _response: ResponseT = {
        success: true,
        data: undefined
    };


    constructor(private req: any) {
        if (req.params && req.params.id) {
            this.id = req.params.id;
        }
        this.user = req.body.user ? req.body.user : {email: "", password: ""};
        if (process.env.DB_DIALECT === "mongodb" || true) {
            const database = new Database("shop");
            this.model = new Mongo(database, "users");
        }
    }

    async login() {
        const token_secret = process.env.TOKEN_SECRET || "secret";

        try {
            const model = await Model.findOne({where: {email: this.user?.email}});

            if (model && await bcrypt.compare(this.user?.password, model.password)) {
                // Set jwt token in header
                const token = await jwt.sign({id: model.id, email: model.email}, token_secret);
                this.success = true;
                this.data = {id: model.id, email: model.email, token};
            } else {
                this.success = false;
                this.data = "Incorrect email or password";
            }
        } catch (error) {
            console.log("Error at login ", error);
            this.success = false;
            this.data = "Server error";
        }
    }

    // CRUD
    async create() {
        const model = await this.model.read({where: {email: this.req.body.user.email}});
        if (model.data.model.length > 0) {
            this.setResponse(false, "Email already registered");
        } else {
            const hashedPassword = await bcrypt.hash(this.user?.password, 10);
            const user: any = await this.model.create({email: this.user?.email, password: hashedPassword});
            this._response = model.response;
        }
        return this;
    }

    async read() {
        let model;
        if (this.id) {
            model = await this.model.read({where: {id: this.id}});
        } else {
            model = await this.model.read();
        }
        this._response = model.response;
        return this;
    }

    async update() {
        const condition = {where: {id: this.req.params.id}};
        const c = new Condition("mongodb", condition);
        const hashedPassword = await bcrypt.hash(this.user?.password, 10);
        const model = await this.model.update(c.get, {email: this.user?.email, password: hashedPassword});

        this._response = model.response;
        return this;
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

export default User;