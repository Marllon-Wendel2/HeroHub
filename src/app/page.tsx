/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Navbar from "./components/navbar";
import Image from "next/image";
import { fetchCharacters, fetchCharAToZ, fetchCharByName, fetchCharZtoA } from "./services/charactersService";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { MarvelEntity } from "./dtos/MarvelEntity";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
 

  const [characters, setCharacters] = useState<MarvelEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [offset, setOffSet] = useState(0)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MarvelEntity[] = await fetchCharacters("0");
        setCharacters(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
  
      if (scrollPosition >= documentHeight) {
        const newOffset = offset + 10;
        setOffSet(newOffset);
        try {
          const data: MarvelEntity[] = await fetchCharacters(`${newOffset}`);
          setCharacters((prevCharacters) => [...prevCharacters, ...data]);
        } catch (error) {
          console.error("Erro ao buscar mais personagens:", error);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);


  async function handleFilter(filter: string): Promise<void> {
    try {
      if (filter === "Z-A") {
        const data = await fetchCharZtoA();  // Filtrar personagens de Z-A
        setCharacters(data);
      } else if (filter === "A-Z") {
        const data = await fetchCharAToZ();  // Filtrar personagens de A-Z
        setCharacters(data);
      } else {
        const data = await fetchCharByName(filter)
        setCharacters(data)
        setIsModalOpen(false)
      }
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
  }

  async function handleModal() {
    if(isModalOpen) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
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
                  <li><button className="dropdown-item" onClick={() => handleModal()}>Por letra</button></li>
              </ul>
          </div>
      <div className={styles.feed} >
      { 
        loading? (
          <div className="spinner-border text-primary m-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : ( characters.map((character) => (
            !character.thumbnail.path.includes("image_not_available") ?
          (<div key={character.id} className="card" style={{ width: '18rem' }}>
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            className="card-img-top"
            alt={character.name}
            width={500} height={300}
          />
          <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text">{character.description || 'Sem descrição disponível'}</p>
            <Link href={`/characters/${character.id}`} className="btn btn-outline-warning">Mais detalhes</Link>
          </div>
        </div>) : ""
        )))
      }
      </div>

      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Qual letra deseja filtrar:</label>
                  <input 
                  className="form-control" 
                  id="message-text"
                  value={message}
                  maxLength={1}
                  onChange={(e) => setMessage(e.target.value)}></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Close</button>
              <button type="button" className="btn btn-outline-warning" onClick={() => handleFilter(message)}>Send message</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}