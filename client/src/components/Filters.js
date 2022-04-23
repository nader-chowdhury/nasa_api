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
            // status: form_data.get("status"),
            // limit: form_data.get("limit"),
            // days: form_data.get("days"),
            // date: {
            //     start: "",
            //     end: ""
            // },
            // magnitude: {
            //     magId: "",
            //     magMin: 0,
            //     magMax: 0
            // },
            // bounding_box: {
            //     min_lon: 0,
            //     max_lat: 0,
            //     max_lon: 0,
            //     min_lat: 0
            // }
        });
        console.log(state.category);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>EONET ID</label>
                <input type="number" name="eonet_id"></input>

                <label>Source</label>
                {sources_list && <Checkboxes name="source" options={sources_list} />}

                <label>Categories</label>
                {categories_list && <Checkboxes name="category" options={categories_list} />}

                <label>Status</label>
                <Checkboxes name="status" options={[
                    {id: "open", title: "Open"},
                    {id: "closed", title: "Closed"},
                    {id: "all", title: "All"}
                ]}/>

                <label>Limit</label>
                <input type="number" name="limit"></input>

                <label>Days</label>
                <input type="number" name="days"></input>

                <input type="submit"/>
            </form>
            {state.ID ? <Table eonet_id={state.ID} /> : <Table />} 
        </div>
    );
}