import React, {useContext} from "react";
import logomarca from '../../assets/assets/logomarca_dark.png'
import { FaPowerOff } from "react-icons/fa";
import { ButtonTransparent } from "../Button";
import context from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { Title } from "../Texts";


export const Header = () => {

    const {user} = useContext(context) //Buscando dentro do contexto os dados do usuario logado
    const navigate = useNavigate();

    const logoutuser = () => {
        try {
            const data = {
                ...user,
                ultimoAcesso: new Date().toLocaleString()
            }

            fetch("http://localhost:3000/usuarios/" + user.id, {
                method: "PUT",
                body: JSON.stringify(data)
            })

            navigate("/")

        } catch (error) {
            alert("Não foi possivel registrar o seu acesso")
        }
    }


    return(
        <header className="w-full flex justify-between items-center py-6">
            <img src={logomarca} alt=""/>

            <div className="flex justify-center items-center gap-5">
                <a target="_blank" href={`https://github.com/${user.login}`} title={`Acessar o perfil do ${user.login} no github`}>
                <img className="rounded-2xl w-[50px] h-[50px]" src={user.image} alt="Foto de perfil do usuário logado" />
                </a>

                <ButtonTransparent onClick={logoutuser} styles="border-primary-red"><FaPowerOff fill="#bf0000"/></ButtonTransparent>

            </div>

        </header>
    )
}