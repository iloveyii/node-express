import Controller from "./base/Controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Sequelize from "../models/Sequelize";

const database = new Database("shop");

// @desc   Get all from Controller
// @route  GET /api/v1/user
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const controller = new Controller(req, model);
    await controller.read();
    return res.status(200).send(controller.response);
};

// @desc   Get a Controller
// @route  GET /api/v1/user/:id
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
     const user = req.body.use || {};
    user.id = req.params.id;
    const model = new Mongo(database, "users", user);
    const controller = new Controller(req, model);
    await controller.read();
    return res.status(200).send(controller.response);
};

// @desc   Register/Create a Controller - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const controller = new Controller(req, model);
    await controller.create();

    return res.status(201).send(controller.response);
};

// @desc   Update a Controller
// @route  UPDATE /api/v1/user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
     const user = req.body.use || {};
    user.id = req.params.id;
    const model = new Mongo(database, "users", user);
    const controller = new Controller(req, model);
    await controller.update();
    return res.status(200).send(controller.response);
};

// @desc   Delete Controller
// @route  DELETE /api/v1/user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
     const user = req.body.use || {};
    user.id = req.params.id;
    const model = new Mongo(database, "users", user);
    const controller = new Controller(req, model);
    await controller.delete();
    return res.status(200).send(controller.response);
};
