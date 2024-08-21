import React from "react";
    
import './MainContent.css'

export const MainContent = ({children}) => {
    return(
        <div className="main-content">
            {children}
        </div>
    )
}