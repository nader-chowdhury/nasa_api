import * as events_controller from "../controllers/events_controller.js";
import express from "express";

const router = express.Router();

router.get("/:id", events_controller.get_events_id);
router.get("/", events_controller.get_events_query);

export { router as default };
