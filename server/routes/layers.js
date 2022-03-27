import fetch from "node-fetch";
import express from "express";

const router = express.Router();

router.route("/")
    .get((req, res) => {
        (async function () {
            const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/layers");
            const data = await response.json();
            res.send(data);
        })();
    });

export { router as default };
