'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Comic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects:[];
    resourceURI: string;
    urls: [];
    thumbnail: {
      path: string;
      extension: string;
  };
}