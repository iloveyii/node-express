import express from "express";
import { getArticlesPage } from "../controllers/front";


const router = express.Router();

router.route("/")
    .get(getArticlesPage);

export default router;
