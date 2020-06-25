import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Model from "../utils/User";
import { verify } from "../utils/authenticate_user";

const User = require("../../sequelize/src/models").User;
const model = new Model({email: "", password: ""});


// @desc   Get all from User
// @route  GET /api/v1/user
export const getUsers = async (req: any, res: any, next: any) => {
    try {
        console.log("API User : GET /api/v1/user");
        const user = [{id: 1, name: "aaaa"}, {id: 2, name: "bbb"}];
        const users = await model.readAll();
        return res.status(200).send({
            success: true,
            data: users
        });

    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};


// @desc   Get a User
// @route  GET /api/v1/user/:id
export const getUser = async (req: any, res: any, next: any) => {
    try {
        console.log("API User : GET /api/v1/user/:id");
        const {id} = req.params;
        let error = undefined;
        let user = await model.readOne(id);
        if (user && (id != user.id)) {
            error = `IDs are different ${id} vs ${user.id}`;
            user = undefined;
        }

        return res.status(200).send({
            success: true,
            data: user,
            error
        });

    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Add to User
// @route  POST /api/v1/user
export const addUser = async (req: any, res: any, next: any) => {
    try {
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        console.log({email, password});
        const user = await model.create({email, password});
        console.log("API User : POST /api/v1/user");
        return res.status(201).send({
            success: true,
            data: user,
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Register a User - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const registerUser = async (req: any, res: any, next: any) => {
    try {
        const {email, password}: { email: string, password: string } = req.body.user ? req.body.user : {
            email: "email",
            password: "pass"
        };
        console.log("API User : POST /api/v1/register");
        console.log({email, password});

        // Check if email already registered
        const model = await User.findOne({where: {email}});

        if (model) {
            return res.status(201).send({
                success: false,
                data: email,
                error: "Email already registered"
            });
        } else {
            // Register new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: any = await User.create({email, password: hashedPassword});

            return res.status(201).send({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

export const updateUser = async (req: any, res: any, next: any) => {
    const model = new Model(req);
    await model.update();

    return res.status(200).send({
        success: model.success,
        data: model.data
    });
};

// @desc   Update User
// @route  PUT /api/v1/user/1
export const updateUser2 = async (req: any, res: any, next: any) => {
    const verified = await verify(req, res, req.params.id);

    if (verified === 1) {
        const model = await User.findOne({where: {id: req.params.id}});
        const status = model && await model.update({
            email: req.body.user.email,
            password: req.body.user.password
        });
        return res.status(200).send({
            success: status,
            data: model.getDataValues
        });
    } else {
        return res.status(403).send({
            success: false,
            error: verified === 403 ? "Forbidden ids are different " : "Invalid token"
        });
    }
};


// @desc   Delete User
// @route  DELETE /api/v1/user
export const deleteUser = async (req: any, res: any, next: any) => {
    const model = new Model(req);
    await model.delete();

    return res.status(200).send({
        success: model.success,
        data: model.data
    });
};

// @desc   Delete User
// @route  DELETE /api/v1/user
export const deleteUser2 = async (req: any, res: any, next: any) => {
    try {
        const {id} = req.params;
        const status = await User.destroy({where: {id}});
        const user = [{id, name: "delete", status}];
        return res.status(200).send({
            success: true,
            data: user
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};