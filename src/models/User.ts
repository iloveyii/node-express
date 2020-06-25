import Token from "./Token";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        this.user = req.body.user ? req.body.user : {email: "", password: ""};
    }

    get response(): ResponseT {
        return {
            success: this.success,
            data: this.data
        };
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