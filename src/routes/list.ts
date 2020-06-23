import express from "express";
import { getList, addList, updateList, deleteList } from "../controllers/list";

const router = express.Router();

router.route("/")
    .get(getList)
    .post(addList)
    .delete(deleteList)
    .put(updateList);

export default router;