import React from "react";
import Modal from "react-modal";
import Title from "../Title/Title";
import { InputDescription } from "../InputDescription/InputDescription";

import './Modal.css'

export const Modaltask = ({addTask, closeModal, onUpdateTask }) => {

    const [taskDescription, setTaskDescription] = useState('');

    const handleAddTask = () => {
        onAddTask(taskDescription);
        setTaskDescription(''); 
        closeModal();
      };
    
      const handleUpdateTask = () => {
        onUpdateTask(taskDescription);
        setTaskDescription('');
        closeModal();
      }
    


    return(
        <Modal className='modal-task' isOpen={isOpen}>
            <Title titleText={'Descreva sua tarefa'}/>
            <InputDescription 
            placeholder={'Exemplo de descrição'} 
            typeInput={'text'} 
            value={taskDescription} 
            onChange={(e) => {
                setTaskDescription(e.target.value)
            }}/>
        </Modal>
    )
}