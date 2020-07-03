import Controller from "./base/Controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
require("dotenv").config();

const token_secret = process.env.TOKEN_SECRET || "secret";

const database = new Database("shop");


// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "users", req.body.user);
    const controller = new Controller(req, model);
    await controller.login(token_secret);
    return res.status(200).send(controller.response);
};

