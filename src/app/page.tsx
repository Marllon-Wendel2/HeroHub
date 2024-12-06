/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Navbar from "./components/navbar";
import Image from "next/image";
import { fetchCharacters, fetchCharAToZ, fetchCharZtoA } from "./services/charactersService";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { MarvelEntity } from "./dtos/MarvelEntity";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {

  const [characters, setCharacters] = useState<MarvelEntity[]>([]);
  

  useEffect(() => {
   const fetchData = async () => {
    try {
      const data: MarvelEntity[] = await fetchCharacters();
      setCharacters(data);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
   };

   fetchData();
  }, []);

  async function handleFilter(filter: string): Promise<void> {
    try {
      if (filter === "Z-A") {
        const data = await fetchCharZtoA();  // Filtrar personagens de Z-A
        setCharacters(data);
      } else if (filter === "A-Z") {
        const data = await fetchCharAToZ();  // Filtrar personagens de A-Z
        setCharacters(data);
      }
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
  }



  return (
    <div>
      <Navbar/>
      <h1>Pesornagens</h1>
      <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filtrar
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleFilter('A-Z')}>A-Z</button></li>
                <li><button className="dropdown-item" onClick={() => handleFilter('Z-A')}>Z-A</button></li>
            </ul>
        </div>
      <div className={styles.feed} >
      {
        characters? (characters.map((character) => (
          <div key={character.id} className="card" style={{ width: '18rem' }}>
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            className="card-img-top"
            alt={character.name}
            width={500} height={300}
          />
          <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text">{character.description || 'Sem descrição disponível'}</p>
            <a href={`/characters/${character.id}`} className="btn btn-primary">Mais detalhes</a>
          </div>
        </div>
        ))) : ""
      }
      </div>
    </div>
  );
}