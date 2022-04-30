import React, { useState, useEffect } from "react";
import Table from "./Table.js";
import Checkboxes from "./Checkboxes";
import "./Filters.css";

export default function Filters () {
    // STATES
    const [state, setState] = useState({ID: undefined});
    const [sources_list, setSources] = useState();
    const [categories_list, setCategories] = useState();

    useEffect(() => {
        fetchSourcesAndCategories();
        console.log(state);
    }, [state]);

    async function fetchSourcesAndCategories () {
        const [sources_res, categories_res] = await Promise.all([
            fetch("https://eonet.gsfc.nasa.gov/api/v3/sources"),
            fetch("https://eonet.gsfc.nasa.gov/api/v3/categories")
        ]);
        const [sources_data, categories_data] = await Promise.all([
            sources_res.json(),
            categories_res.json()
        ]);

        setSources(sources_data.sources);
        setCategories(categories_data.categories);
    }

    function handleCheckBoxSubmit(name) {
        return Array
            .from(document.querySelectorAll(`input[type=checkbox][name=${name}]:checked`))
            .map((input) => input.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        let form_data = new FormData(event.target);

        setState({
            ID: form_data.get("eonet_id"),
            source: handleCheckBoxSubmit("source"),
            category: handleCheckBoxSubmit("category"),
            status: form_data.get("status"),
            limit: form_data.get("limit"),
            days: form_data.get("days"),
            date: {
                start: form_data.get("start_date"),
                end: form_data.get("end_date")
            },
            magnitude: {
                magId: form_data.get("magID"),
                magMin: form_data.get("magMin"),
                magMax: form_data.get("maxMax")
            },
            bounding_box: {
                min_lon: form_data.get("min_lon"),
                max_lat: form_data.get("max_lat"),
                max_lon: form_data.get("max_lon"),
                min_lat: form_data.get("min_lat")
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>EONET ID:</label>
                <input type="number" name="eonet_id"></input>

                <fieldset>
                    <legend>Source</legend>
                    {sources_list && <Checkboxes name="source" options={sources_list} />}
                </fieldset>

                <fieldset>
                    <legend>Categories</legend>
                    {categories_list && <Checkboxes name="category" options={categories_list} />}
                </fieldset>

                <fieldset>
                    <legend>Status</legend>
                    <div>
                        <label htmlFor="status_open">Open</label>
                        <input id="status_open"type="radio" name="status" value="open"></input>
                    </div>
                    <div>
                        <label htmlFor="status_closed">Closed</label>
                        <input id="status_closed"type="radio" name="status" value="closed"></input>
                    </div>
                    <div>
                        <label htmlFor="status_all">All</label>
                        <input id="status_all"type="radio" name="status" value="all"></input>
                    </div>
                </fieldset>


                <label>Limit:</label>
                <input type="number" name="limit"></input>

                <label>Days:</label>
                <input type="number" name="days"></input>

                <fieldset>
                    <legend>Date</legend>
                    <div>
                        <label htmlFor="start_date">Start Date:</label>
                        <input type="date" id="start_date" name="start_date" min="2015-05-01"></input>
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input type="date" name="end_date"></input>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Magnitude</legend>
                    <div>
                        <label htmlFor="magID">Magnitude ID:</label>
                        <input id="magID" type="text" name="magID"></input>
                    </div>
                    <div>
                        <label htmlFor="magMin">Magnitude Minimum:</label>
                        <input id="magMin" type="number" name="magMin"></input>
                    </div>
                    <div>
                        <label htmlFor="magMax">Magnitude Maximum:</label>
                        <input id="magMax" type="number" name="magMax"></input>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Bounding Box</legend>
                    <div>
                        <label htmlFor="min_lon">Minimum Longitude:</label>
                        <input id="min_lon" type="number" name="min_lon"></input>
                    </div>
                    <div>
                        <label htmlFor="max_lon">Maximum Longitude:</label>
                        <input id="max_lon" type="number" name="max_lon"></input>
                    </div>
                    <div>
                        <label htmlFor="min_lat">Minimum Latitude:</label>
                        <input id="min_lat" type="number" name="min_lat"></input>
                    </div>
                    <div>
                        <label htmlFor="max_lat">Maximum Latitude:</label>
                        <input id="max_lat" type="number" name="max_lat"></input>
                    </div>
                </fieldset>

                <input type="submit"/>
            </form>
            {state.ID ? <Table eonet_id={state.ID} /> : <Table />} 
        </div>
    );
}