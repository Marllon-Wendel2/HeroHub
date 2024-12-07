'use client'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { MarvelEntity } from '../dtos/MarvelEntity';

export async function fetchCharacters(): Promise<MarvelEntity[]> {
    const publicKey = '74e99808fa3d0e434a8015f0522ba677';

    const timestamp = Date.now().toString();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    const hash = CryptoJS
        .MD5(timestamp +privateKey+ publicKey)
        .toString(CryptoJS.enc.Hex);


    
    const baseURL = 'https://gateway.marvel.com/v1/public/characters';
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10`;

    try {
        const response = await axios.get(url);
        return response.data.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw error;
    }
}

export async function fetchCharZtoA(): Promise<MarvelEntity[]> {
    const publicKey = '74e99808fa3d0e434a8015f0522ba677';

    const timestamp = Date.now().toString();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    const hash = CryptoJS
        .MD5(timestamp +privateKey+ publicKey)
        .toString(CryptoJS.enc.Hex);


    
    const baseURL = 'https://gateway.marvel.com/v1/public/characters';
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10&orderBy=-name`;

    try {
        const response = await axios.get(url);
        return response.data.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw error;
    }
}

export async function fetchCharAToZ(): Promise<MarvelEntity[]> {
    const publicKey = '74e99808fa3d0e434a8015f0522ba677';

    const timestamp = Date.now().toString();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    const hash = CryptoJS
        .MD5(timestamp +privateKey+ publicKey)
        .toString(CryptoJS.enc.Hex);


    
    const baseURL = 'https://gateway.marvel.com/v1/public/characters';
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=10&orderBy=name`;

    try {
        const response = await axios.get(url);
        return response.data.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw error;
    }
}

export async function fetchCharById(id : any): Promise<MarvelEntity[]> {
    const publicKey = '74e99808fa3d0e434a8015f0522ba677';

    const timestamp = Date.now().toString();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    const hash = CryptoJS
        .MD5(timestamp +privateKey+ publicKey)
        .toString(CryptoJS.enc.Hex);


    
    const baseURL = `https://gateway.marvel.com/v1/public/characters/${id}`;
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await axios.get(url);
        return response.data.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw error;
    }
}

export async function fetchCharByName(name : string): Promise<MarvelEntity[]> {
    const publicKey = '74e99808fa3d0e434a8015f0522ba677';

    const timestamp = Date.now().toString();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    const hash = CryptoJS
        .MD5(timestamp +privateKey+ publicKey)
        .toString(CryptoJS.enc.Hex);


    
    const baseURL = `https://gateway.marvel.com/v1/public/characters`;
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}&limit=4`;

    try {
        const response = await axios.get(url);
        return response.data.data.results;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro na requisição:', error.response?.data || error.message);
        } else {
            console.error('Erro desconhecido:', error);
        }
        throw error;
    }
}