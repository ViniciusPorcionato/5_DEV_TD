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

      <SendButton text={'Enviar Tarefa'} onclick={() => setShowModal(true)}/>

        {showModal ? <ModalTask addTask={handleAddTask} closeModal={() => setShowModal(false)}/> : <></>}


     </MainContent>
    );
}


export default App;
