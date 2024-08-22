import React from "react";
import './ButtonConfirm.css'

export const ButtonConfirm = ({textButton, onclick}) => {
    return(
        <button className="buttonConfirm" onclick={onclick}>
            {textButton}
        </button>
    )
}