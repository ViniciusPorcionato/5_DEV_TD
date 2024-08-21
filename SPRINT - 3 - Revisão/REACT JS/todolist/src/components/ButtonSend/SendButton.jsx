import React from "react";

import './SendButton.css'

export const SendButton = ({text}) => {
    return(
        <button className="send-button">
            {text}
        </button>
    )
}