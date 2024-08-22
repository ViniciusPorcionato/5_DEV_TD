import logo from './logo.svg';
import './App.css';
import { MainContent } from './components/MainContent/MainContent';
import { BoxContent } from './components/BoxContent/BoxContent';
import moment from 'moment';
import { SearchInput } from './components/SearchInput/SearchInput';
import { SendButton } from './components/Buttons/Buttons';
import { InputDescription } from './components/InputDescription/InputDescription';
import { Title } from './components/Title/Title';
import { useState } from 'react';
import { ModalTask } from './components/Modal/Modal';

function App() {

  const [showModal, setShowModal] = useState(false);

  //função para abrir o modal
  const openModal = () => setShowModal(true)
  //função para fechar o modal
  const closeModal = () => setShowModal(false)

  //state para o array as tarefas
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (description) => {
    setTasks([...tasks, { description, toDo: false }]);
  };

  const now = moment();

  return (
    <MainContent>

      <BoxContent>

          <Title titleText={moment().format('dddd, MMMM Do')} color='#FCFCFC'/>

          <SearchInput  placeholder={'Procurar tarefa'} typeInput={'search'}/>

      </BoxContent>


      <SendButton text={'Enviar Tarefa'} onclick={openModal}/>

        {
          showModal && (
              <ModalTask openModal={showModal} addTask={handleAddTask} closeModal={closeModal}/>
          )
        }


     </MainContent>
    );
}


export default App;
