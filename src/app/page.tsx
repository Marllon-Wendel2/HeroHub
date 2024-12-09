/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import ListOfCharacters from "./components/listOfCharacters";
import Navbar from "./components/navbar";

import styles from "./page.module.css";


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
 


  

 

  return (
    <div>
      <Navbar/>
      <h1 className={styles.title} >CHARACTERS</h1>
      <ListOfCharacters></ListOfCharacters>
    </div>
  );
}