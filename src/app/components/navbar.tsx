'use client'

import { useState } from "react";
import { fetchCharByName } from "../services/charactersService";

export default function Navbar() {

    const [searchChar, setSearchChar] = useState("");
    const [searchResults, setSearchResults] = useState([]);


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
                <a className="navbar-brand" href="/">MARVEL</a>
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
                {searchResults.map((character: any) => (
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