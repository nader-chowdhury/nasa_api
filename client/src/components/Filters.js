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
    }, []);

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
    
    function handleSubmit(event) {
        event.preventDefault();

        let form_data = new FormData(event.target);
        setState({
            ID: form_data.get("eonet_id"),
            source: form_data.get("source"),
            category: form_data.get("category"),
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

                <label>Source</label>
                {sources_list && <Checkboxes name="source" options={sources_list} />}

                <label>Categories</label>
                {categories_list && <Checkboxes name="category" options={categories_list} />}

                <label>Status:</label>
                <Checkboxes name="status" options={[
                    {id: "open", title: "Open"},
                    {id: "closed", title: "Closed"},
                    {id: "all", title: "All"}
                ]}/>

                <label>Limit:</label>
                <input type="number" name="limit"></input>

                <label>Days:</label>
                <input type="number" name="days"></input>

                <label>Start Date:</label>
                <input type="date" name="start_date" min="2015-05-01"></input>
                <label>End Date:</label>
                <input type="date" name="end_date"></input>

                <fieldset>
                    <legend>Magnitude</legend>
                    <label>Magnitude ID:</label>
                    <input type="text" name="magID"></input>
                    <label>Magnitude Minimum:</label>
                    <input type="number" name="magMin"></input>
                    <label>Magnitude Maximum:</label>
                    <input type="number" name="magMax"></input>
                </fieldset>

                <fieldset>
                    <legend>Bounding Box</legend>
                    <label>Minimum Longitude:</label>
                    <input type="number" name="min_lon"></input>
                    <label>Minimum Latitude:</label>
                    <input type="number" name="min_lat"></input>
                    <label>Maximum Longitude:</label>
                    <input type="number" name="max_lon"></input>
                    <label>Maximum Latitude:</label>
                    <input type="number" name="max_lat"></input>
                </fieldset>

                <input type="submit"/>
            </form>
            {state.ID ? <Table eonet_id={state.ID} /> : <Table />} 
        </div>
    );
}