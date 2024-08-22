import React from "react";
import './Buttons.css'

import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

export const SendButton = ({text, onclick}) => {
    return(
        <button className="send-button" onclick={onclick} >
            {text}
        </button>
    )
}

export const ButtonConfirm = ({textButton, onclick}) => {
    return(
        <button className="buttonConfirm" onclick={onclick}>
            {textButton}
        </button>
    )
}

export const ButtonDelete = ({onClick}) => {
    return(
        <button onClick={onClick} className="button-delete"> <IoClose color="#1E123B" fontSize={30}/> </button >
    )
}

export const ButtonEdit = ({onClick}) => {
    return(
        <button onClick={onClick} className="button-edit"> <MdEdit color="#1E123B" fontSize={30}/> </button >
    )
}