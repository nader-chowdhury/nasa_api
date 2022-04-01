import * as categories_controller from "../controllers/categories_controller.js";
import express from "express";

const router = express.Router();

router.get("/:category", categories_controller.get_categories);
router.get("/", categories_controller.get_categories_empty);

export { router as default };
