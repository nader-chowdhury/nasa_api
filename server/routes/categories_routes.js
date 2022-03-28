import * as categories_controller from "../controllers/categories_controller.js";
import express from "express";

const router = express.Router();

router.route("/")
    .get(categories_controller.get_categories);

export { router as default };
