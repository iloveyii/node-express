import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Condition from "../models/base/Condition";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

const token_secret = process.env.TOKEN_SECRET || "secret";

const database = new Database("shop");


// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const condition = new Condition({where: {email: req.body.user.email}});
        const model = new Mongo(database, "users", req.body.user);
        await model.read(condition);
        const response = model.response;
        const user = response.data[0];
        if (response.success && await bcrypt.compare(req.body.user.password, user.password)) {
            // Set jwt token in header
            console.log("Sign token :", {id: user.id, email: user.email}, token_secret);
            const token = await jwt.sign({id: user.id, email: user.email}, token_secret);
            return res.status(200).send({success: true, data: [{id: user.id, email: user.email, token}]});
        } else {
            return res.status(200).send({success: false, data: ["Incorrect email or password"]});
        }
    } catch (error) {
        console.log("Error at login ", error);
        return res.status(403).send({success: false, data: ["Server error"]});
    }
};

