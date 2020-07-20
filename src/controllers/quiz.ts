import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Quiz from "../models/Quiz";
import User from "../models/User";
import Question from "../models/Question";


const database = new Database("shop");

// @desc   Get all quizzes for a user id
// @route  GET /api/v1/quizzes/:id
export const getQuiz = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getQuiz", req.params);
    if (req.params.id === "undefined") return res.status(404).send({success: false, data: []});
    const condition = new Condition({where: {id: req.params.id}});
    // Find the first user
    const model = new User(database, undefined);
    await model.read(condition);
    // Get last quiz
    const last_quiz_id = model.response.data[0].quiz.length > 0 ? model.response.data[0].quiz.length - 1 : 0;
    const quiz = model.response.data[0].quiz[last_quiz_id];
    console.log("quiz", quiz, JSON.stringify(model.response));
    if (!quiz) {
        return res.status(200).send({success: false, data: [{id: 0}]});
    } else {
        let question_ids = quiz.questions.map((q: any) => q.id);
        console.log(question_ids);
        question_ids = question_ids.filter((id: any) => id);
        // find Questions
        const condition1 = new Condition({where: {id: question_ids}});
        const question = new Question(database, undefined);
        await question.read(condition1);
        return res.status(200).send(question.response);
    }
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Quiz received :", req.body.quiz);
    const model = new Quiz(req.params.id, 2);
    await model.create();
    return res.status(201).send(model.response);
};
