import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Question from "../models/Question";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/questions
export const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getQuestions");
    const model = new Question(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/questions/:id
export const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Question(database, req.body.question);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Question received :", req.body.question);
    const model = new Question(database, req.body.question);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/question
export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Question(database, req.body.question);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/question
export const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting record from questions with id ", req.params.id);
    const model = new Question(database, req.body.question);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
