'use client'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { MarvelEntity } from '../models/MarvelEntity';
import { Comic } from '../models/Comic';

const baseURL = 'https://gateway.marvel.com/v1/public/characters';
const publicKey = '74e99808fa3d0e434a8015f0522ba677';
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const timestamp = Date.now().toString();

const hash = CryptoJS
    .MD5(timestamp +privateKey+ publicKey)
    .toString(CryptoJS.enc.Hex);

export async function fetchCharacters(offset: string): Promise<MarvelEntity[]> {
    
    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=15&offset=${offset}`;

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

    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=15&orderBy=-name`;

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

    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=15&orderBy=name`;

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

    const url = `${baseURL}/${id}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

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

    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}&limit=15`;

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

export async function fetchComics(id : any): Promise<Comic[]> {
    
    const url = `${baseURL}/${id}/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=5`;

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