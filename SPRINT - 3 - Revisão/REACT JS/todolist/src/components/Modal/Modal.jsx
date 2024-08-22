import React, {useState} from "react";
import Modal from "react-modal";
import Title, { TitleModal } from "../Title/Title";
import { InputDescription } from "../InputDescription/InputDescription";
import './Modal.css'
import { ButtonConfirm } from "../Buttons/Buttons";

export const ModalTask = ({addTask, closeModal, onUpdateTask }) => {

    const [taskDescription, setTaskDescription] = useState('');

    const handleAddTask = () => {
        addTask(taskDescription);
        setTaskDescription(''); 
        closeModal();
      };
    
      const handleUpdateTask = () => {
        onUpdateTask(taskDescription);
        setTaskDescription('');
        closeModal();
      }
    
    return(
        <div className='modal-box'>
            <div className='content-modal'>

                <TitleModal 
                titleText={'Descreva sua tarefa'} 
                color="white"/>

                <InputDescription  
                placeholder={'Exemplo de descrição'} 
                typeInput={'text'} 
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                />

                <ButtonConfirm 
                textButton={'Confirmar tarefa'} 
                onclick={handleAddTask}/>

            </div>
        </div>
    )
}