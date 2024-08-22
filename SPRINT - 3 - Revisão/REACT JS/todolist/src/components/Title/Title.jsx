import React from "react";

import './Title.css'

export const Title = ({titleText, color = "", additionalClass = '' }) => {
    return(
        <h1 className={`title ${additionalClass}`} style={{color : color}}>{titleText}</h1>
    )
}

export const TitleModal = ({titleText, color = "", additionalClass = '' }) => {
    return(
        <h1 className={`titleModal ${additionalClass}`} style={{color : color}}>{titleText}</h1>
    )
}