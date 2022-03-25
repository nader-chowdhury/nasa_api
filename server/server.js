import fetch from "node-fetch";
import express from "express";

const server = express();
const PORT = 5000;
const API_KEY = "qEyHcD0VLOdWyRqdYK8n95OeU9FnVQk9ZxBomape";

// ROUTER IMPORTS
import eventsRouter from "./routes/events.js";

// ROUTER HANDLERS
server.use("/events", eventsRouter);

server.get("/",(req, res) => {
    res.send("hellot");
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
