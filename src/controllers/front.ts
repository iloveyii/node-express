import ejs from "ejs";
import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product from "../models/Product";


const database = new Database("blog");

// @desc   Get all from Model
// @route  GET /api/v1/product
export const getArticlesPage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Params : ", req.params);
    switch (req.params?.id) {
        case "index":
            res.render("front/articles.ejs");
            break;
        case "carousel":
            res.render("front/partials/_carousel.ejs", {extractStyles: true, extractScripts: true});
            break;
        case "details":
            res.render("front/partials/_details.ejs");
            break;
        default:
            res.status(404).render("front/404.ejs", {id: req.params.id});
    }
};

