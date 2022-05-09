import fetch from "node-fetch";

async function get_events_query(req, res) {
    let url = "https://eonet.gsfc.nasa.gov/api/v3/events?";
    let query_string = new URLSearchParams(req.query);

    const response = await fetch(url + query_string.toString());
    const data = await response.json();
    res.send(data);
}

async function get_events_id(req, res) {
    try {
        const response = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/events/${req.params.id}`);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
        console.log("ID NOT FOUND");
        get_events_query(req, res);
    }
    
}

export {
    get_events_query,
    get_events_id,
}