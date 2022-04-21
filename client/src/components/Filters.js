import React, { useState } from "react";
import Table from "./Table.js";
import "./Filters.css";

function Filters () {
    const [state, setState] = useState({
        ID: 0,
    });

    function handleSubmit(event) {
        event.preventDefault();

        let form_data = new FormData(event.target);
        setState({
            ID: form_data.get("eonet_id")
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label >EONET ID</label>
                <input type="number" name="eonet_id"></input>
            </form>
            <Table eonet_id={state.ID}/>
        </div>
    );
}

export default Filters;
