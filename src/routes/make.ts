import express from "express";
import { getMake, getMakes, createMake, updateMake, deleteMake } from "../controllers/make";


const router = express.Router();

router.route("/:id")
    .get(getMake)
    .delete(deleteMake)
    .put(updateMake);

router.route("/")
    .get(getMakes)
    .post(createMake);

export default router;
