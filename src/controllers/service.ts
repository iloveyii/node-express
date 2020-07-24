import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Service from "../models/Service";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/services
export const getServices = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getServices");
    const model = new Service(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/services/:id
export const getService = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Service(database, req.body.service);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createService = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Service received :", req.body.service);
    const model = new Service(database, req.body.service);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/crud
export const updateService = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Service(database, req.body.service);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/crud
export const deleteService = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Service(database, req.body.service);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
