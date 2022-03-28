import fetch from "node-fetch";

async function get_categories(req, res) {
    const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/categories");
    const data = await response.json();
    res.send(data);
}

export {
    get_categories,
}
