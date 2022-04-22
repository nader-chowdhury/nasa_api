import React, { useState, useEffect } from "react";
import "./Table.css";
import TableRow  from "./TableRow.js";

export default function Table (props) {
    const [data, setData] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch(props.eonet_id === 0 ? "/events?" : `/events/EONET_${props.eonet_id}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    });

    function fillTable (data) {
        if ("events" in data) {
            let table_rows = data.events.map((event) => {
                return <TableRow key={event.id} event={event} />;
            });
            return table_rows;
        } else {
            return <TableRow event={data} />;
        }
    }

    return (
        <table>
            <caption>{data ? data.title : "Title loading . . ."}</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    {/* <th>Link</th> */}
                    {/* <th>Closed</th> */}
                    <th>Categories</th>
                    <th colSpan={7}>Sources</th>
                    <th>Geometry</th>
                </tr>
            </thead>
            <tbody>
                {data ? fillTable(data) : <tr><td>Loading</td></tr>}
            </tbody>
        </table>
    );
}