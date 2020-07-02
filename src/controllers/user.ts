import User from "../models/User";
import { RequestHandler, Request, Response, NextFunction } from "express";

const dialect = "mysql"; // process.env.DB_DIALECT || "mongodb";

// @desc   Get all from User
// @route  GET /api/v1/user
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a User
// @route  GET /api/v1/user/:id
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.read();

    return res.status(200).send(model.response);
};

// @desc   Register/Create a User - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.create();

    return res.status(201).send(model.response);
};

// @desc   Update a User
// @route  UPDATE /api/v1/user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.update();
    return res.status(200).send(model.response);
};

// @desc   Delete User
// @route  DELETE /api/v1/user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.delete();
    return res.status(200).send(model.response);
};
