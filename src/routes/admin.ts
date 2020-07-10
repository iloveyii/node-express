import express from "express";
import { getPage, saveData } from "../controllers/admin";


const router = express.Router();

router.route("/:id")
    .get(getPage)
    .post(saveData);

router.route("")
    .get(getPage);

export default router;
