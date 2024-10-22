import React, { useEffect, useState, useContext } from "react";
import { Paragraph, TextError, Title } from "../../Components/Texts";
import { ButtonLink } from "../../Components/Button";
import { FormAccess } from "../../Components/Forms";
import { useNavigate } from "react-router-dom";
import context from "../../Context/userContext";

import {v4 as uuid} from "uuid"
import {octokit} from '../../Utils/githubkey'


const Login = ({onLinking}) => {

    //importando dentro do contexto, a função de alimentar os dados do usuario
    const{setUser} = useContext(context)

    const navigate = useNavigate();

    const [load, setLoad] = useState(null)
    const [message, setMessage] = useState("");
    const [userAccess, setUserAccess] = useState("");

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        }
    },[message])

    useEffect(() => {
        setUser({})//Limpando o acesso do usuário na context
    }, [])


    const verifyAccess = (e) => {
        e.preventDefault();

        setLoad(true)

        fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
        .then(response => response.json())
        .then(response => {
            if (response[0]) {
                //alimentar os dados do user para o context da aplicação
                setUser(response[0]) 
                navigate("/painel-ativos")
            }else{

                setMessage("Usuário não encontrado, tente novamente !")
            }
        }).catch(() => {
            setMessage("Não foi possível efetuar o login, tente novamente")
        })

        setLoad(false)
        setUserAccess("")
    }


    return(
        <section className="flex flex-1 flex-col items-center justify-center gap-8 ">
            <Title>Entrar na plataforma</Title>

            <Paragraph styles={"w-[60%]"}>
            Para acessar sua conta, informe seu usuário de acesso vínculado ao Github
            </Paragraph>

            {/* Formulário de acesso */}
            <FormAccess
            load={load}
            onSubmit={verifyAccess}
            value={userAccess}
            onChange={e => setUserAccess(e.target.value)}
            textButton={"Efetuar Login"}/>

            <TextError>{message}</TextError>

            <Paragraph>Já possui registro?<ButtonLink onClick={onLinking}>registrar conta</ButtonLink></Paragraph>

        </section>
    )
}

export default Login;