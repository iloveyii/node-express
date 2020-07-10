import ejs from "ejs";
import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product from "../models/Product";


const database = new Database("blog");

// @desc   Get all from Model
// @route  GET /api/v1/product
export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Params admin : ", req.params);
    const options = {extractStyles: true, extractScripts: true, layout: "admin/layout"};
    switch (req.params.id) {
        case undefined:
        case "":
            res.render("admin/dashboard.ejs", options);
            break;
        case "article":
            res.render("admin/partials/_article.ejs", options);
            break;
        default:
            res.status(404).render("admin/404.ejs", options);
    }
};

