import React from "react";
import './SearchInput.css';
import { IoIosSearch } from "react-icons/io";

export const SearchInput = ({typeInput, placeholder, value, onChange}) => {
    return(
        <div className="searchInput">
            <IoIosSearch color="white" fontSize={20}/>
            <input onChange={(x) => onChange(x.target.value)} className="input" type={typeInput} placeholder={placeholder} value={value}></input>
        </div>
    )
}