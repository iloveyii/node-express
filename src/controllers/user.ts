import Controller from "./base/Controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Sequelize from "../models/Sequelize";

const dialect =  process.env.CONTROLLER_DIALECT || "mongodb";
let model: any;

if (dialect === "mongodb") {
    const database = new Database("shop");
    model = new Mongo(database, "users");
    console.log("Connected to MongoDB shop");
}
if (["mysql", "postgres", "mssql"].includes(dialect)) {
    console.log("Connected to Sequelize");
    model = new Sequelize();
}

// @desc   Get all from Controller
// @route  GET /api/v1/user
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.read();
    return res.status(200).send(controller.response);
};

// @desc   Get a Controller
// @route  GET /api/v1/user/:id
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.read();

    return res.status(200).send(controller.response);
};

// @desc   Register/Create a Controller - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.create();

    return res.status(201).send(controller.response);
};

// @desc   Update a Controller
// @route  UPDATE /api/v1/user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.update();
    return res.status(200).send(controller.response);
};

// @desc   Delete Controller
// @route  DELETE /api/v1/user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.delete();
    return res.status(200).send(controller.response);
};
