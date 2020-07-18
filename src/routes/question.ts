import express from "express";
import { getQuestion, getQuestions, createQuestion, updateQuestion, deleteQuestion } from "../controllers/question";


const router = express.Router();

// @todo only admin can delete/update
// @todo a user can only read questions in its quiz - but it needs a separate path
router.route("/:id")
    .get(getQuestion)
    .delete(deleteQuestion)
    .put(updateQuestion);

router.route("/")
    .get(getQuestions)
    .post(createQuestion);

export default router;
