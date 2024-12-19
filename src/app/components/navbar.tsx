/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { useState } from "react";
import { fetchCharByName } from "../services/charactersService";
import { MarvelEntity } from "../models/MarvelEntity";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({backgroundColor = "#8B0000"}) {

    console.log("Navbar backgroundColor:", backgroundColor);

    const [searchChar, setSearchChar] = useState("");
    const [searchResults, setSearchResults] = useState<MarvelEntity[]>([]);


    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if(searchChar.trim()) {
          const data = await fetchCharByName(searchChar);
          setSearchResults(data);
        }
    }
    // backgroundColor: "#8B0000"

    return (
        <div style={{ position: "fixed", top: 0, bottom: 0, width: "100%", zIndex: 1000, pointerEvents: 'none' }}>
        <nav className="navbar" style={{ backgroundColor, pointerEvents: 'auto'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" href="/"><Image 
                src={'/Marvel_Logo.svg.png'}
                width={150}
                height={80}
                alt="Hero Hub Logo" 
                /></Link>

                <div>
                    <form className={`d-flex w-100 w-md-50`} role="search" onSubmit={handleSearch}>
                    <input 
                        className="form-control me-2 flex-grow-1" 
                        type="search" 
                        placeholder="Search..." 
                        aria-label="Search"
                        value={searchChar}
                        onChange={(e) => setSearchChar(e.target.value)} 
                        style={{ width: "100px"  }}
                        />
                    <button className="btn btn-outline-warning" type="submit">Search</button>
                </form>
                <div>
                <div>
                    <ul className="list-group" style={{position: "fixed"}}>
                {searchChar ? (searchResults.map((character: MarvelEntity) => (
                        <li className="list-group-item list-group-item-action text-decoration-none"
                         key={character.id}
                         style={{ backgroundColor: "#2F4F4F"}}
                         >
                            <Link className="text-decoration-none" 
                            href={`/characters/${character.id}`}
                            style={{ color: "dark-yellow"}}
                            >{character.name}</Link></li>
                        ))) : ""}
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    </div>
    );
}