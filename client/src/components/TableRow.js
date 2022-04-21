import React, { useState, useEffect } from "react";
import "./TableRow.css";

function TableRow (props) {
    let event = props.event;

    return (
        <tr>
            <td>{event.id}</td>
            <td>{event.title}</td>
            <td>{event.description}</td>
            {/* <td>{event.link}</td> */}
            {/* <td>{event.closed}</td> */}
            {event.categories.map((category) => {
                return <td key={category.id}>{category.title}</td>
            })}
            {event.sources.map((source) => {
                return <td key={source.id}>{source.id}</td>
            })}
            {/* {event.geometry.map((point) => { */}
            {/*     return  */}
            {/* })} */}
        </tr> 
    )
}

export default TableRow;