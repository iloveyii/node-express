import { Request, Response, NextFunction } from "express";


// @desc   Get the specified page
// @route  GET /admin/:id
export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Params admin get : ", req.params);
    const options = {
        extractStyles: true,
        extractScripts: true,
        layout: "admin/layout",
        table: {caption: "Products", cols: ["Name", "Price", "Stock"], fields: ["name", "price", "stock"], rows: [
            ]}
    };
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




