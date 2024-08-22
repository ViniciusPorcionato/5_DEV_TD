import logo from './logo.svg';
import './App.css';
import { MainContent } from './components/MainContent/MainContent';
import { BoxContent } from './components/BoxContent/BoxContent';
import Title from './components/Title/Title';
import moment from 'moment';
import { SearchInput } from './components/SearchInput/SearchInput';
import { SendButton } from './components/ButtonSend/SendButton';
import { useState } from 'react';
import { Modaltask } from './components/Modal/Modal';

function App() {

  const [showModal, setShowModal] = useState(false);

  function OpenModal() {
    setModalIsOpen(true)
  }
  function CloseModal() {
    setModalIsOpen(false)
  }

  const now = moment();

  return (
    <MainContent>
      <BoxContent>
        {/* <div className='flex-tile'>
          <Title titleText={moment().format('dddd,')} color='#FCFCFC'/>
          <Title titleText={moment().format('MMMM')} color='#8758FF'/>
          <Title titleText={moment().format('Do')} color='#FCFCFC'/>
        </div> */}
          <Title titleText={moment().format('dddd, MMMM Do')} color='#FCFCFC'/>
          <SearchInput placeholder={'Procurar tarefa'} typeInput={'search'}/>
      </BoxContent>
      <SendButton text={'Enviar Tarefa'} onclick={OpenModal()}/>
     </MainContent>
  );
}

<Modaltask
isOpen={modalIsOpen}
/>

export default App;
