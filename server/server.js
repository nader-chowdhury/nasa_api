import fetch from "node-fetch";
import express from "express";
const server = express();
const PORT = 5000;
const API_KEY = "qEyHcD0VLOdWyRqdYK8n95OeU9FnVQk9ZxBomape";

server.get("/", (req, res) => {
    (async () => {
        try {
            const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events");
            const data = await response.json();
            res.send(data);
        } catch (error) {
            console.log(error);    
        }
    })();
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
