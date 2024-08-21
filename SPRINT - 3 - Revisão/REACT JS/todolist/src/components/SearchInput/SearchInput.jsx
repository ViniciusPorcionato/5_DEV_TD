import React from "react";

import './SearchInput.css';
import { IoIosSearch } from "react-icons/io";

export const SearchInput = ({typeInput, placeholder, value}) => {
    return(
        <div className="searchInput">
            <IoIosSearch color="white" fontSize={20}/>
            <input className="input" type={typeInput} placeholder={placeholder} value={value}></input>
        </div>
    )
}