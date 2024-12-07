/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Navbar from "./components/navbar";
import Image from "next/image";
import { fetchCharacters, fetchCharAToZ, fetchCharZtoA } from "./services/charactersService";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { MarvelEntity } from "./dtos/MarvelEntity";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
 

  const [characters, setCharacters] = useState<MarvelEntity[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
   const fetchData = async () => {
    try {
      const data: MarvelEntity[] = await fetchCharacters();
      setCharacters(data);
      setLoading(false)
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
      <h1 className={styles.title} >PERSONAGENS</h1>
          <div className="btn-group">
            <button type="button" className="btn btn-info dropdown-toggle m-4" data-bs-toggle="dropdown" aria-expanded="false">
                Filtrar
            </button>
              <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={() => handleFilter('A-Z')}>A-Z</button></li>
                  <li><button className="dropdown-item" onClick={() => handleFilter('Z-A')}>Z-A</button></li>
              </ul>
          </div>
      <div className={styles.feed} >
      { 
        loading? (
          <div className="spinner-border text-primary m-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) :(characters.map((character) => (
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
            <Link href={`/characters/${character.id}`} className="btn btn-primary">Mais detalhes</Link>
          </div>
        </div>
        )))
      }
      </div>
    </div>
  );
}