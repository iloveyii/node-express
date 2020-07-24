import express from "express";
import { getService, getServices, createService, updateService, deleteService } from "../controllers/service";


const router = express.Router();

router.route("/:id")
    .get(getService)
    .delete(deleteService)
    .put(updateService);

router.route("/")
    .get(getServices)
    .post(createService);

export default router;
