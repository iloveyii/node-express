import express from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser, getLatestQuiz } from "../controllers/user";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getUser)
    .delete(deleteUser) // should admin delete
    .put([authenticate_user, same_user_id], updateUser);

router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id/latest-quiz")
    .get(getLatestQuiz);

export default router;
