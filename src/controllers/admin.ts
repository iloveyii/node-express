import ejs from "ejs";
import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product from "../models/Product";


const database = new Database("blog");

// @desc   Get the specified page
// @route  GET /admin/:id
export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Params admin get : ", req.params);
    const options = {extractStyles: true, extractScripts: true, layout: "admin/layout"};
    switch (req.params.id) {
        case undefined:
        case "":
            res.render("admin/dashboard.ejs", options);
            break;
        case "article":
            res.render("admin/partials/_article.ejs", options);
            break;
        case "product":
            res.render("admin/partials/_product.ejs", options);
            break;
        case "settings":
            res.render("admin/partials/_settings.ejs", options);
            break;
        case "toggle":
            res.render("admin/partials/_toggle.ejs", options);
            break;
        default:
            res.status(404).render("admin/404.ejs", options);
    }
};


// @desc   Save data to the specified page
// @route  POST /admin/:id
export const saveData = async (req: Request, res: Response, next: NextFunction) => {
    const options = {extractStyles: true, extractScripts: true, layout: "admin/layout"};
    console.log("Params admin for save : ", req.params);
    switch (req.params.id) {
        case undefined:
        case "":
            res.render("admin/dashboard.ejs", options);
            break;
        case "article":
            res.render("admin/partials/_article.ejs", options);
            break;
        case "product":
            return res.status(201).send({success: "done"});
            break;
        case "settings":
            res.render("admin/partials/_settings.ejs", options);
            break;
        case "toggle":
            res.render("admin/partials/_toggle.ejs", options);
            break;
        default:
            res.status(404).render("admin/404.ejs", options);
    }
};



