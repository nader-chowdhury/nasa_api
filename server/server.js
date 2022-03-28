import express from "express";

const server = express();
const PORT = 5000;
const API_KEY = "qEyHcD0VLOdWyRqdYK8n95OeU9FnVQk9ZxBomape";

// ** DELETE **
server.set("json spaces", "\t");

// ROUTER IMPORTS
import events_router from "./routes/events_routes.js";
import categories_router from "./routes/categories_routes.js";
import layers_router from "./routes/layers_routes.js";

// ROUTER HANDLERS
server.use("/events", events_router);
server.use("/categories", categories_router);
server.use("/layers", layers_router);

server.get("/",(req, res) => {
    res.send("INDEX");
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
