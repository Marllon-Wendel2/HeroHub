/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useState } from "react";
import { fetchCharByName } from "../services/charactersService";
import { MarvelEntity } from "../dtos/MarvelEntity";
import Link from "next/link";

export default function Navbar() {

    const [searchChar, setSearchChar] = useState("");
    const [searchResults, setSearchResults] = useState<MarvelEntity[]>([]);


    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if(searchChar.trim()) {
          const data = await fetchCharByName(searchChar);
          setSearchResults(data);
        }
    }

    return (
        <div>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">MARVEL</Link>
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={searchChar}
                        onChange={(e) => setSearchChar(e.target.value)} 
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div>
                {searchResults.map((character: MarvelEntity) => (
                    <div key={character.id}>
                        <ul className="list-group list-group-horizontal-lg">
                            <li className="list-group-item list-group-item-dark"><a href={`/characters/${character.id}`}>{character.name}</a></li>
                        </ul>
                    </div>
                ))}
                </div>
            </div>
        </nav>
    </div>
    );
}