import jwt from "jsonwebtoken";

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
    success: boolean = true;
    data: any = undefined;

    constructor(private user: any) {
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
        const user: UserT = {email: this.user.body.user.email, password: this.user.body.user.password};
        const model = await Model.findOne({where: {id: this.user.params.id}});
        // Verify if same id user
        const verified = await this.verify();
        const status = verified === 1 && model && await model.update({...user});
        if (status) {
            this.success = true;
            this.data = model.dataValues;
        } else {
            this.success = false;
            this.data = "Some error occurred";
        }
    }

    get Success() {
        return this.success;
    }

    get Data() {
        return this.data;
    }

    delete(id: number) {
        return Model.destroy({where: {id}});
    }

    async verify() {
        const token_secret = process.env.TOKEN_SECRET || "secret";
        try {
            const authData: any = await jwt.verify(this.user.token, token_secret);
            if (Number(this.user.params.id) !== Number(authData.id)) {
                return 403;
            }
            return 1;
        } catch (e) {
            return 0;
        }
    }

}

export default User;