import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Make from "../models/Make";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/makes
export const getMakes = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getMakes");
    const model = new Make(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/makes/:id
export const getMake = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Make(database, req.body.make);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createMake = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Make received :", req.body.make);
    const model = new Make(database, req.body.make);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/crud
export const updateMake = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Make(database, req.body.make);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/crud
export const deleteMake = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Make(database, req.body.make);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
