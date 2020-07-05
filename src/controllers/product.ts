import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/base/Mongo";
import Condition from "../models/base/Condition";
import Product from "../models/Product";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/product
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Product(database, "products", undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/product/:id
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Product(database, "products", req.body.product);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Product(database, "products", req.body.product);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Product(database, "products", req.body.product);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Product(database, "products", req.body.product);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
