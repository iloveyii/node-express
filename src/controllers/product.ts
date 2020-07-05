import Controller from "./base/Controller";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Mongo from "../models/Mongo";
import Sequelize from "../models/Sequelize";
import Condition from "../models/base/Condition";

const database = new Database("shop");


// @desc   Get all from Controller
// @route  GET /api/v1/product
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "products", undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Controller
// @route  GET /api/v1/product/:id
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body.product || {};
    product.id = req.params.id;
    console.log("controller products ");
    const model = new Mongo(database, "products", product);
    const controller = new Controller(req, model);
    await controller.read();
    return res.status(200).send(controller.response);
};

// @desc   Register/Create a Controller - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "products", req.body.product);
    await model.create({email: "", password: ""}); // @todo remove
    return res.status(201).send(model.response);
};

// @desc   Update a Controller
// @route  UPDATE /api/v1/product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Mongo(database, "products", req.body.product);
    await model.update(condition, {});
    return res.status(200).send(model.response);
};

// @desc   Delete Controller
// @route  DELETE /api/v1/product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Mongo(database, "products", req.body.product);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
