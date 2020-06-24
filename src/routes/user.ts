import express from "express";
import { getUser, getUsers, addUser, registerUser, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

router.route("/")
    .get(getUsers)
    .post(registerUser);

export default router;