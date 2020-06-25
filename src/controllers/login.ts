import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";


// @desc   Make a user log in
// @route  Post /api/v1/login
export const loginUser = async (req: any, res: any, next: any) => {
    const model = new User(req);
    await model.login();

    return res.status(200).send({
        success: model.success,
        data: model.data
    });
};

