import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Fault from "../models/Fault";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/faults
export const getFaults = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getFaults");
    const model = new Fault(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/faults/:id
export const getFault = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Fault(database, req.body.product);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createFault = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Fault received :", req.body.product);
    const model = new Fault(database, req.body.product);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/crud
export const updateFault = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Fault(database, req.body.product);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/crud
export const deleteFault = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Fault(database, req.body.product);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
