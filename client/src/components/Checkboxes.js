import React from "react";
import "./Checkboxes.css";

export default function Checkboxes (props) {

    function populateCheckboxes (option_list, filter) {
        let check_boxes = option_list.map((option) => {
            return (
                <li key={option.id}>
                    <input type="checkbox" id={option.id} name={filter} value={option.id} />
                    <label htmlFor={option.id}>{option.title}</label>
                </li>
            )
        });
        return check_boxes;
    }

    return (
        <div className="checkboxes">
            {populateCheckboxes(props.options, props.name)}
        </div>
    );

}