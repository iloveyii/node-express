import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Quiz from "../models/Quiz";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/quizzes
export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getQuizzes");
    const model = new Quiz(database, undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/quizzes/:id
export const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Quiz(database, req.body.question);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   create a quiz for user with :id and N random question ids
// @route  POST /api/v1/quizzes
export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Quiz received :", req.body.quiz);
    const model = new Quiz(database, req.body.quiz);
    // await model.validate() &&
    await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/question
export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Quiz(database, req.body.question);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/question
export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting record from quizzes with id ", req.params.id);
    const model = new Quiz(database, req.body.question);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
