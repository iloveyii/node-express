import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Model from "../utils/User";
import { verify } from "../utils/authenticate_user";

const User = require("../../sequelize/src/models").User;
const model = new Model({email: "", password: ""});

// @desc   Get all from User
// @route  GET /api/v1/user
export const getUsers = async (req: any, res: any, next: any) => {
    const users = await Model.read();

    return res.status(200).send({
        success: true,
        data: users
    });
};

// @desc   Get a User
// @route  GET /api/v1/user/:id
export const getUser = async (req: any, res: any, next: any) => {
    const {id} = req.params;
    const user = await Model.read({where: {id}});

    return res.status(200).send({
        success: user ? true : false,
        data: user
    });
};

// @desc   Register/Create a User - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: any, res: any, next: any) => {
    const model = new Model(req);
    await model.create();

    return res.status(200).send({
        success: model.success,
        data: model.data
    });
};

// @desc   Update a User
// @route  UPDATE /api/v1/user
export const updateUser = async (req: any, res: any, next: any) => {
    const model = new Model(req);
    await model.update();

    return res.status(200).send({
        success: model.success,
        data: model.data
    });
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
