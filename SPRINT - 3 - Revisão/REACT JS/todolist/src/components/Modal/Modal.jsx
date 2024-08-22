import React from "react";
import Modal from "react-modal";
import Title from "../Title/Title";
import { InputDescription } from "../InputDescription/InputDescription";

import './Modal.css'

export const Modaltask = ({isOpen}) => {
    return(
        <Modal className='modal-task' isOpen={isOpen}>
            <Title titleText={'Descreva sua tarefa'}/>
            <InputDescription placeholder={'Exemplo de descrição'} typeInput={'text'}/>
        </Modal>
    )
}