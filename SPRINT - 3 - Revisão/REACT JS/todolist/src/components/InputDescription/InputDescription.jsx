import React from "react";
import './InputDescription.css'

export const InputDescription = ({typeInput, placeholder, value, onChange}) => {
    return(
        <input onChange={onChange} className="input-description" type={typeInput} placeholder={placeholder} value={value}></input>
    )
}