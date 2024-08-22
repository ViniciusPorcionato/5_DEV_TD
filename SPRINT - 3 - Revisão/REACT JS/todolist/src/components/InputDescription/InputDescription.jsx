import React from "react";
import './InputDescription.css';

export const InputDescription = ({typeInput, placeholder, value, onChange}) => {
    return(
        <input className="inputDescription" value={value} placeholder={placeholder} type={typeInput} onChange={onChange}></input>
    )
}