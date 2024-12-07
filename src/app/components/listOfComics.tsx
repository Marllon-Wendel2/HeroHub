/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { Comic } from "../dtos/Comic"
import { fetchComics } from "../services/charactersService"
import { useParams } from "next/navigation"

export default function ListComics() {
    
    const params = useParams()

    const [comics, setComics] = useState<Comic[]>([])

    useEffect(() => {
        const fectData = async () => {
            try {
                const data: Comic[] = await fetchComics(params.id);
                setComics(data)
            } catch (error) {
                console.error("Erro ao buscar personagens:", error)
            }
        };
        
        fectData()
    }, [params.id]);

    return (
        <div>
            <h1 style={{ color: "white", margin: "20px"}}>COMICS</h1>
            <div id="carouselExampleInterval" className={`carousel slide ${window.innerWidth < 768 ? 'w-100' : 'w-50'}" data-bs-ride="carousel`} >
                <div className="carousel-inner">
                    {comics.length > 1? (comics.map((comic, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''} `} data-bs-interval="10000" key={comic.id}>
                                        <Image
                                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                            className="d-block w-50 m-auto"
                                            alt={comic.title || "Comic Image"}
                                            width={100}
                                            height={400}
                                            style={{ maxWidth: "200px",  maxHeight: "400px"}}
                                        />
                        </div>
                    ))) : ""}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
    )
}