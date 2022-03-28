import * as events_controller from "../controllers/events_controller.js";
import express from "express";

const router = express.Router();

router.get("/",events_controller.get_events_query);

router.get("/:id", events_controller.get_events_id);

export { router as default };
