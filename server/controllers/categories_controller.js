import fetch from "node-fetch";

async function get_categories_empty(req, res) {
    const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/categories");
    const data = await response.json();
    res.send(data);
}

async function get_categories(req, res) {
    let url = `https://eonet.gsfc.nasa.gov/api/v3/categories/${req.params.category}?`;
    let query_string = new URLSearchParams(req.query);

    const response = await fetch(url + query_string.toString());
    const data = await response.json();
    res.send(data);
}

export {
    get_categories_empty,
    get_categories,
}
