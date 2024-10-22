import React from "react";
import { ButtonTransparent } from "../Button";

export const Table = ({list, setUpdate, setList}) => {

    const removeAtivement = (ativo) =>{
        try {
            const data = {
                ...ativo,
                status : !ativo.status
            }

            fetch("http://localhost:3000/ativos/" + ativo.id, {
                method: "PUT",
                body: JSON.stringify(data)
            })

            //Procurando na lista o item que esta sendo atualizado, caso o item seha encontrado
            //devolvemos o objeto com os dados atualizados para a lista, caso não, retornamos apenas os item que já existe
            setList(list.map(item => item.id === ativo.id ? data : item))
            
        } catch (error) {
            alert("Não foi possivel remover o ativo informado")
        }
    }

    const getAtivement = (ativo) => {
        setUpdate(ativo)
    }


    return(
        <table className="w-full mt-10">
            <thead>
                <tr className="bg-[#e1e0e7]">
                    <th className="py-5 px-10 text-left rounded-l">Identificação do ativo</th>
                    <th className="py-5 px-10 text-left">Nome do ativo</th>
                    <th className="py-5 px-10 text-left">Data de registro</th>
                    <th className="py-5 px-10 text-left rounded-r">Ações do ativo</th>
                </tr>
            </thead>

            <tbody>

                {
                    list.map((item, index) => {
                        return(
                        <tr key={index} className="hover:bg-[#f1f0f5] hover:border-l-2 hover:border-primary-purple">
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.numero}</td>
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.nome}</td>
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.dataRegistro}</td>
                            <td className="py-5 px-10 flex text-left gap-5">
                            <ButtonTransparent onClick={e => getAtivement(item)} styles="border-none py-0 px-0 text-[#009e9e]">Editar ativo</ButtonTransparent>
                            <ButtonTransparent onClick={e => removeAtivement(item)} styles="border-none py-0 px-0 text-primary-red">{item.status ? "Excluir" : "Inserir"} ativo</ButtonTransparent>
                            </td>
                        </tr>
                        )
                    })
                }

                
            </tbody>

        </table>
    )
}