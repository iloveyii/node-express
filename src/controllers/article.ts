import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Article from "../models/Article";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/articles
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getArticles");
    const model = new Article(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/articles/:id
export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Article(database, req.body.article);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Article received :", req.body.article);
    const model = new Article(database, req.body.article);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/article
export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Article(database, req.body.article);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/article
export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting record from articles with id ", req.params.id);
    const model = new Article(database, req.body.article);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
