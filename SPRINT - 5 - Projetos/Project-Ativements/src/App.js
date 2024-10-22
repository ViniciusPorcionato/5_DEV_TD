import { useState } from 'react';
import {Paragraph, Title} from './Components/Texts/index';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logomarca from './assets/assets/logomarca.png'
import LogomarcaDark from './assets/assets/logomarca_dark.png'

function App() {

  const [statusRegister, setStatusRegister] = useState(true);


  return (
    <main className="h-screen flex md:flex-row sm:flex-col">

      <section className={`flex flex-col items-center justify-center bg-atvGradient lg:w-1/2 absolute lg:h-screen sm:w-screen sm:h-[50%]transition-all duration-500 ${statusRegister ? "lg:left-[50%] lg:top-0 sm:top-[50%]": "sm:top-0 lg:left-0 "} sm:w-screen ssm:h-1/2`}>

        <Title styles="text-complementary-white">Bem-vindo ao <img className='mt-3' src={Logomarca} alt='Ativements'/></Title>

        <Paragraph styles="text-complementary-white mt-16 w-[45%]">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática
        </Paragraph>

      </section>

        <Register onLinking={e => setStatusRegister(false)}/>

        <Login onLinking={e => setStatusRegister(true)}/>

    </main>
  );
}


export default App;
