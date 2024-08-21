import React from "react";

import './Title.css'

const Title = ({titleText, color = "", additionalClass = '' }) => {
    return(
        <h1 className={`title ${additionalClass}`} style={{color : color}}>{titleText}</h1>
    )
}

export default Title;