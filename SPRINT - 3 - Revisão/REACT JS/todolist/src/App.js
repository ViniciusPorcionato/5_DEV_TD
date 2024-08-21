import logo from './logo.svg';
import './App.css';
import { MainContent } from './components/MainContent/MainContent';
import { BoxContent } from './components/BoxContent/BoxContent';
import Title from './components/Title/Title';
import moment from 'moment';
import { SearchInput } from './components/SearchInput/SearchInput';
import { SendButton } from './components/ButtonSend/SendButton';

function App() {

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
          <SearchInput placeholder={'Procurar tarefa'}/>
      </BoxContent>
      <SendButton text={'Enviar Tarefa'}/>
     </MainContent>
  );
}

export default App;
