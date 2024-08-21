import React from "react";

import './BoxContent.css'

export const BoxContent = ({children}) => {
    return(
        <div className="box-content">
            {children}
        </div>
    )
}