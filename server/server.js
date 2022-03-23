const express = require("express");
const server = express();
const PORT = 5000;

server.get("/", (request, response) => {
    response.send("Hello World!");
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
