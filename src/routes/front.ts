import express from "express";
import { getPage } from "../controllers/front";


const router = express.Router();

router.route("/:id")
    .get(getPage);

router.route("")
    .get(getPage);

export default router;
