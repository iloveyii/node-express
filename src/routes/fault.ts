import express from "express";
import { getFault, getFaults, createFault, updateFault, deleteFault } from "../controllers/fault";


const router = express.Router();

router.route("/:id")
    .get(getFault)
    .delete(deleteFault)
    .put(updateFault);

router.route("/")
    .get(getFaults)
    .post(createFault);

export default router;
