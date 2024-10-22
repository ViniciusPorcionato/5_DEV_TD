import React from "react";
import { Paragraph } from "../Texts";

export const Tabs = ({places, setSelectedPlace, selectedPlace}) => {
    return(
        <ul className="list-none w-full flex gap-5">

            {
                places.length ? places.map((item, index) => {
                    return(
                        <li key={index} className={selectedPlace === item.id && "border-b-2 border-primary-blue text-primary-blue"}>
                        <a onClick={e => setSelectedPlace(item.id)} className="p-5 text-center w-[200px] flex font-semibold text-lg justify-centercursor-pointer">{item.nome}</a>
                        </li>
                    )
                }) : <Paragraph>Nenhum local informado</Paragraph>
            }
        </ul>
    )
}