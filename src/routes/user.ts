import express from "express";
import { getUser, getUsers, addUser, registerUser, updateUser, deleteUser } from "../controllers/user";
import { authenticate_user } from "../utils/authenticate_user";

const router = express.Router();

router.route("/:id")
    .get(authenticate_user, getUser)
    .delete(authenticate_user, deleteUser)
    .put(authenticate_user, updateUser);

router.route("/")
    .get(getUsers)
    .post(registerUser);

export default router;