'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MarvelCharacter {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    resourceURI: string;
    comics: {
        available: number;
        collectionURI: string;
        items: MarvelCharacter[];
        returned: number;
    };
    series: {
        available: number;
        collectionURI: string;
        items: MarvelCharacter[];
        returned: number;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: MarvelCharacter[];
        returned: number;
    };
    events: {
        available: number;
        collectionURI: string;
        items: MarvelCharacter[]; 
        returned: number;
    };
    urls: any[]; 
}