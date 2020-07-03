import Controller from "./base/Controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Sequelize from "../models/Sequelize";


const dialect = process.env.CONTROLLER_DIALECT || "mongodb";
const token_secret = process.env.TOKEN_SECRET || "secret";
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

// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const controller = new Controller(req, model);
    await controller.login(token_secret);

    return res.status(200).send(controller.response);
};

