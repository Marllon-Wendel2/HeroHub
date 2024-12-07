/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
"use client"
import Navbar from "../../components/navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { fetchCharById } from "@/app/services/charactersService";
import { useParams } from "next/navigation";
import { MarvelEntity } from "@/app/dtos/MarvelEntity";
import ListComics from "@/app/components/listOfComics";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function CharactersPage() {
    const params = useParams()

    const [character, setCharacter] = useState<MarvelEntity[]>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const fetchData = async () => {
         try {
           const data: MarvelEntity[] = await fetchCharById(params.id);
           setCharacter(data);
         } catch (error) {
           console.error("Erro ao buscar personagens:", error);
         }
        };
     
        fetchData();
       }, [params.id]);

    return (
        <div>
            <Navbar/>
                { character ? (character.map((char) => (
                    <div className={`card mb-3 ${window.innerWidth < 768 ? 'w-100' : 'w-50'} m-auto`}  key={char.id}>
                        <Image src={`${char.thumbnail.path}.${char.thumbnail.extension}`} className="card-img-top" alt="Personagem"  width={300} height={400}/>
                        <div className="card-body">
                            <h5 className="card-title">{char.name}</h5>
                            <p className="card-text">{char.description}</p>
                            <ul className="list-group">
                                <li className="list-group-item">Comics Disponíveis: {char.comics.available}</li>
                                <li className="list-group-item">Participou des séries: {char.series.available}</li>
                                <li className="list-group-item">Participou des histórias: {char.stories.available}</li>
                                <li className="list-group-item">Participou de eventos: {char.events.available}</li>
                            </ul>
                        </div>
                    </div>
                ))) : <div className="spinner-border text-primary m-auto" role="status" >
                <span className="visually-hidden">Loading...</span>
              </div>}
              <ListComics></ListComics>
        </div>
    );
}