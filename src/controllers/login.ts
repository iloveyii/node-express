import User from "../models/User";
import { RequestHandler, Request, Response, NextFunction } from "express";


const dialect = "mysql"; // process.env.DB_DIALECT || "mongodb";
const token_secret = process.env.TOKEN_SECRET || "secret";

// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const model = new User(req, dialect);
    await model.login(token_secret);

    return res.status(200).send(model.response);
};

