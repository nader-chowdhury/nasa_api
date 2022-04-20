import React, { useState, useEffect } from "react";
import "./Table.css";

function Table () {
    const [data, setData] = useState(null);

    async function fetchData() {
        try {
            const response = await fetch("/events?");
            const data = await response.json();
            setData(data);
        } catch (error) {
           console.log(error); 
        }
    }

    useEffect(() => {
        fetchData();
    });

    function fillRows (event_array) {
        let table_rows = event_array.map((event) => {
            return (
                <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    {/* <td>{event.link}</td> */}
                    {/* <td>{event.closed}</td> */}
                    {event.categories.map((category) => {
                        return (<td>{category.title}</td>)
                    })}
                    {event.sources.map((source) => {
                        return (<td>{source.id}</td>)
                    })}
                    {/* {event.geometry.map((point) => { */}
                    {/*     return  */}
                    {/* })} */}
                </tr> 
            )
        });
        return table_rows;
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
                {data ? fillRows(data.events) : <tr><td>Loading</td></tr>}
            </tbody>
        </table>
    );
}

export default Table;
