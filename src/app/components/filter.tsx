/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import styles from "../page.module.css";
import { fetchCharZtoA } from '../services/charactersService';
import { useEffect, useState } from 'react';
import { MarvelEntity } from '../dtos/MarvelEntity';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Filter() {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [characters, setCharacters] = useState<MarvelEntity[]>([]);


    async function handleFilter(filter:string): Promise<void>  {
        if(filter === "Z-A") {
           const feedElements = document.getElementsByClassName(styles.feed)
           for (let i = 0; i < feedElements.length; i++) {
            feedElements[i].innerHTML = '';

        }
    }
    
}

useEffect(() => {
    const fetchData = async () => {
     try {
       const data = await fetchCharZtoA();
       setCharacters(data);
     } catch (error) {
       console.error("Erro ao buscar personagens:", error);
     }
    };
 
    fetchData();
   }, []);

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filtrar
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleFilter('A-Z')}>A-Z</button></li>
                <li><button className="dropdown-item" onClick={() => handleFilter('Z-A')}>Z-A</button></li>
            </ul>
        </div>
    );
}