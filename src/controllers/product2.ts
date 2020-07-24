import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product2 from "../models/Product2";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getProducts");
    const model = new Product2(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/products/:id
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Product2(database, req.body.product);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Product2 received :", req.body.product2);
    const model = new Product2(database, req.body.product2);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/crud
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Product2(database, req.body.product);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/crud
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Product2(database, req.body.product);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
