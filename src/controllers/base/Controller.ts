import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseT, UserT } from "../../types";
import Condition from "../../models/base/Condition";
import { ControllerI } from "../../interfaces";


// -------------------------------------------------------------
// Make it a general Model between controller and specific model
// -------------------------------------------------------------
class Controller implements ControllerI {
    isNewRecord: boolean = true;
    user: UserT | undefined = undefined;
    id: number = 0;
    // for response
    _response: ResponseT = {
        success: true,
        data: []
    };

    constructor(private req: any, private model: any) {
        if (req.params && req.params.id) {
            this.id = req.params.id;
        }
        this.user = req.body.user ? req.body.user : {email: "", password: ""};

    }

    async login(token_secret: string) {
        try {
            const c = new Condition({where: {email: this.user?.email}});
            const model = await this.model.read(c);
            console.log("Inside login", model.response);
            const user = model.response.data[0];
            if (model.response.success && await bcrypt.compare(this.user?.password, user.password)) {
                // Set jwt token in header
                const token = await jwt.sign({id: user.id, email: user.email}, token_secret);
                this.setResponse(true, {id: user.id, email: user.email, token});
            } else {
                this.setResponse(false, "Incorrect email or password");
            }
        } catch (error) {
            console.log("Error at login ", error);
            this.setResponse(false, "Server error");
        }
    }

    // CRUD
    async create() {
        const condition = new Condition({where: {email: this.req.body.user.email}});
        console.log("inside create", condition);
        const model = await this.model.read(condition);
        console.log(model);
        if (model.response.success) {
            this.setResponse(false, "Email already registered");
        } else {
            const hashedPassword = await bcrypt.hash(this.user?.password, 10);
            const user = await this.model.create({email: this.user?.email, password: hashedPassword});
            this._response = user.response;
        }
        return this;
    }

    async read() {
        let model;
        if (this.id) {
            console.log("find one", this.id);
            const c = new Condition({where: {id: this.id}});
            model = await this.model.read(c);
        } else {
            console.log("find many", this.id);
            model = await this.model.read();
        }
        this._response = model.response;
        return this;
    }

    async update() {
        const condition = {where: {id: this.req.params.id}};
        const c = new Condition(condition);
        const hashedPassword = await bcrypt.hash(this.user?.password, 10);
        const model = await this.model.update(c, {email: this.user?.email, password: hashedPassword});

        this._response = model.response;
        return this;
    }

    async delete() {
        const condition = {where: {id: this.id}};
        const c = new Condition(condition);
        const model = await this.model.delete(c);

        this._response = model.response;
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

export default Controller;