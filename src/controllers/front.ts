import ejs from "ejs";
import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product from "../models/Product";


const database = new Database("blog");

// @desc   Get all from Model
// @route  GET /api/v1/product
export const getArticlesPage = async (req: Request, res: Response, next: NextFunction) => {
    res.render("front/articles.ejs");
};

