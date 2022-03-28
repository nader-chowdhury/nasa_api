import fetch from "node-fetch";

async function get_layers(req, res) {
    const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/layers");
    const data = await response.json();
    res.send(data);
}

export {
    get_layers,
}
