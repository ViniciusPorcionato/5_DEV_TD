import React from "react";
import './SendButton.css'

export const SendButton = ({text, onclick}) => {
    return(
        <button className="send-button" onclick={onclick} >
            {text}
        </button>
    )
}