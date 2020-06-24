import express from "express";
import { getUser, addUser, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.route("/")
    .get(getUser)
    .post(addUser);

router.route("/:id")
    .delete(deleteUser)
    .put(updateUser);

export default router;