import express from "express";
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product2";


const router = express.Router();

router.route("/:id")
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct);

router.route("/")
    .get(getProducts)
    .post(createProduct);

export default router;
