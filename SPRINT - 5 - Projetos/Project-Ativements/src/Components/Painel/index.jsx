import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { FormAtivement } from "../Forms";
import { Tabs } from "../Tabs";
import { Table } from "../Table";

export const Painel = () => {

    const [selectedPlace, setSelectedPlace] = useState("")
    const [places, setPlaces] = useState([])
    const [listAtivements, setListAtivements] = useState([])
    const [update, setUpdate] = useState({})
    
    //Buscar os locais cadastrados no banco
    const getPlaces = () => {
        fetch("http://localhost:3000/locais")
        .then(response => response.json())
        .then(response => {
            setPlaces(response)

            //Pegando a primeira referencia dos locais dos ativos
            if (response[0]) {
                setSelectedPlace(response[0].id)
            }
        })
        .catch(()=> {
            alert("Erro inesperado, não foi possivel obter os locais dos ativos")
        })
    } 
    
        useEffect(() => {
            if (selectedPlace === "") {
                getPlaces();
            }
        }, [])

        //Função de listar os ativos de acordo com o local informado
        const filterAtivements = (local) =>{
            fetch("http://localhost:3000/ativos?local=" + local)
            .then(response => response.json())
            .then(response => {
                setListAtivements(response)
            })
            .catch(() => {
                alert("Não foi possivel obter os ativos")
            })
        }

        useEffect(() => {filterAtivements(selectedPlace)} ,[selectedPlace])

    return(
        <div className="w-10/12 my-0 mx-auto ">
            <Header/>

            {/* Formulário para criação/ edição de ativos */}
            <FormAtivement places={places} setPlaces={setPlaces} list={listAtivements} setList={setListAtivements} update={update}/>

            {/* Tabs - Listagem de locais de ativos */}
            <Tabs places={places} setSelectedPlace={setSelectedPlace} selectedPlace={selectedPlace}/>

            {/* Listagem dos ativos cadastrados */}
            <Table list={listAtivements.filter(x => x.local === selectedPlace)} setUpdate={setUpdate}  setList={setListAtivements}/>
            
        </div>
    )
}