import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Condition from "../models/base/Condition";
import bcrypt from "bcrypt";

const database = new Database("shop");

// @desc   Get all from Controller
// @route  GET /api/v1/user
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Controller
// @route  GET /api/v1/user/:id
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const condition = new Condition({where: {id: req.params.id}});
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Controller - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body;
    user.password = await bcrypt.hash(user?.password, 10);
    const model = new Mongo(database, "users", user);
    await model.create({});
    return res.status(201).send(model.response);
};

// @desc   Update a Controller
// @route  UPDATE /api/v1/user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const condition = new Condition({where: {id: req.params.id}});
    await model.update(condition, {});
    return res.status(200).send(model.response);
};

// @desc   Delete Controller
// @route  DELETE /api/v1/user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
