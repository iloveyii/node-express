import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Quiz from "../models/Quiz";


const database = new Database("shop");

// @desc   Get a Model
// @route  GET /api/v1/quizs/:id
export const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Quiz received :", req.body.quiz);
    const model = new Quiz(req.params.id, 2);
    await model.create();
    return res.status(201).send(model.response);
};
