import express from "express";
import { getArticlesPage } from "../controllers/front";


const router = express.Router();

router.route("/:id")
    .get(getArticlesPage);

router.route("")
    .get(getArticlesPage);

export default router;
