import * as layers_controller from "../controllers/layers_controller.js";
import express from "express";

const router = express.Router();

router.get("/", layers_controller.get_layers);

export { router as default };
