import React from "react"

export const Title = (props) => {
    //text-2xl = tamanho da fonte
    //font-semibold = peso da fonte
    //text-center = text align 
    return <h1 className={`text-2xl font-semibold text-center ${props.styles}`}>{props.children}</h1>
}

export const Paragraph = (props) =>{
    return <p className={`text-xl text-center ${props.styles}`}>{props.children}</p>
}

export const TextError = (props) => {
    return <p className={`text-lg text-primary-red`}>{props.children}</p>
}