import * as events_controller from "../controllers/events_controller.js";
import express from "express";

const router = express.Router();

router.route("/")
    .get(events_controller.get_events);

export { router as default };
