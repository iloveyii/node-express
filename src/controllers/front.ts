import ejs from "ejs";
import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Product from "../models/Product";
import Article from "../models/Article";


const database = new Database("shop");

// @desc   Get all from Model
// @route  GET /api/v1/product
export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Params : ", req.params);
    const options = {
        extractStyles: true,
        extractScripts: true,
        layout: "front/layout"
    };
    switch (req.params?.id) {
        case  "index":
        case "articles":
            const article = new Article(database, undefined);
            await article.read();
            res.render("front/articles.ejs", {
                extractStyles: true,
                extractScripts: true,
                layout: "front/layout",
                articles: article.response.data
            });
            break;
        case "products":
            const product = new Product(database, undefined);
            await product.read();
            res.render("front/products.ejs", {
                extractStyles: true,
                extractScripts: true,
                layout: "front/layout",
                products: product.response.data
            });
            break;
        case "carousel":
            res.render("front/partials/_carousel.ejs", options);
            break;
        case "details":
            res.render("front/partials/_details.ejs", options);
            break;
        default:
            res.status(404).render("front/404.ejs", options);
    }
};

