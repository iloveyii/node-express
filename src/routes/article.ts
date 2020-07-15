import express from "express";
import { getArticle, getArticles, createArticle, updateArticle, deleteArticle } from "../controllers/article";


const router = express.Router();

router.route("/:id")
    .get(getArticle)
    .delete(deleteArticle)
    .put(updateArticle);

router.route("/")
    .get(getArticles)
    .post(createArticle);

export default router;
