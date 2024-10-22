import React, { useState, useContext } from "react";
import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";
import { useNavigate } from "react-router-dom";

import {v4 as uuid} from "uuid"
import {octokit} from '../../Utils/githubkey'
import context from "../../Context/userContext";

const Register = ({onLinking}) => {

     //importando dentro do contexto, a função de alimentar os dados do usuario
    const {setUser} = useContext(context)
    const navigate = useNavigate();
    const [load, setLoad] = useState(null)
    const [message, setMessage] = useState("");
    const [userAccess, setUserAccess] = useState("");


    //Função para validar o perfil do GitHub
    const validateUser = (e) =>{
        e.preventDefault();

        setLoad(true)

        octokit.request("GET /users/{username}" , {
            username: userAccess,
            headers : {
                "X-GitHub-Api-Version" : "2022-11-28"
            }
        }).then( async response => {

            const verify = await checkUserExists()

            if (verify) {
                setMessage("Usuário já registrado")
            }else{
                registerUser(response.data)
            }


        }).catch(() => {
            setMessage("Usuário inválido")
        })

        setLoad(false)
        setMessage("")
    }

    //Função para verificar se o usuário já está registrado
    const checkUserExists = () => {
        return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLocaleLowerCase()}`)
        .then(response => response.json())
        .then(response => {
            if(response.lenght > 0){
                return true
            }
            return false;
        }).catch(() => {
            alert("Não foi possivel consultar usuário!")
        })
    }

    //Função para registrar o usuário
    const registerUser = (user) => {
        try {
            
            const data = {
                //gerar um id unique
                id : uuid(),
                login : user.login.toLocaleLowerCase(),
                image : user.avatar_url,
            }

            fetch("http://localhost:3000/usuarios" , {
                method : "POST",
                body: JSON.stringify(data)
            })
            
            setUser(data)
            navigate("/painel-ativos")

        } catch (error) {
            setMessage("Não foi possível registrar o usuário, tente novamente")
        }
    }

    return(
        <section className="flex flex-1 flex-col items-center justify-center gap-8 ">
            <Title>Registrar-se na plataforma</Title>

            <Paragraph styles={"w-[60%]"}>
            Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github
            </Paragraph>

            {/* Formulário de acesso */}
            <FormAccess
            load={load}
            onSubmit={validateUser}
            value={userAccess}
            onChange={e => setUserAccess(e.target.value)}
            textButton={"Cadastrar Conta"}/>

            <TextError>{message}</TextError>

            <Paragraph>Já possui registro?<ButtonLink onClick={onLinking}>acessar aqui</ButtonLink></Paragraph>

        </section>
    )
}

export default Register;