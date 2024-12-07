'use client'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { fetchCharZtoA } from '../services/charactersService';
import { useEffect, useState } from 'react';
import { MarvelEntity } from '../dtos/MarvelEntity';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Filter() {

    const [characters, setCharacters] = useState<MarvelEntity[]>([]);

    const handleFilter = (filter: string): void => {
        if (filter === "Z-A") {
            const filteredCharacters = characters.slice().sort((a, b) => b.name.localeCompare(a.name));
            setCharacters(filteredCharacters);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: MarvelEntity[] = await fetchCharZtoA();
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