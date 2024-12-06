"use client"
import Navbar from "../../components/navbar";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { fetchCharById } from "@/app/services/charactersService";

export default function CharactersPage({ params }: { params: { id: string } }) {
    const { id } = React.use(params);

    const [character, setCharacter] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
         try {
           const data = await fetchCharById(id);
           setCharacter(data);
         } catch (error) {
           console.error("Erro ao buscar personagens:", error);
         }
        };
     
        fetchData();
       }, [id]);

    return (
        <div>
            <Navbar/>
                {character.map((char) => (
                    <div className="card mb-3" key={char.id}>
                        <Image src={`${char.thumbnail.path}.${char.thumbnail.extension}`} className="card-img-top" alt="..."  width={300} height={400}/>
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
                ))}
        </div>
    );
}