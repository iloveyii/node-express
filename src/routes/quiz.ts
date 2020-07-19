import express from "express";
import { getQuiz, createQuiz } from "../controllers/quiz";


const router = express.Router();

// @todo only admin can delete/update
// @todo a user can only read questions in its quiz - but it needs a separate path
router.route("/:id")
    .get(getQuiz)
    .post(createQuiz);

export default router;
