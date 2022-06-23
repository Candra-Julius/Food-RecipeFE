/* eslint-disable react/jsx-key */
import NavBar from "../component/NavBar";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import landing from '../public/assets/image/Rectangle 313.png'
import dummy from '../public/assets/image/1471262.png'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [recipe, setRecipe] = useState([])
  async function fetchData() {
    const result = await axios.get('http://localhost:8000/home') 
    setRecipe(result.data.hasil)
  
  }
useEffect(()=>{
  fetchData()
},[])
  return (
    <div className={styles.container}>
      <NavBar/>

      <main className={styles.main}>
        <div className={styles.sect1}>
          <div className={styles.subSect1}>
          <div className={styles.mainText}>
          <h1>Discover Recipe & Delicious Food</h1>
          </div>
          <div className={styles.landing}>
          <Image src={landing} alt='landing image' />
          </div>
          </div>
          <div className={styles.subSect2}>
          </div>
        </div>
      <div className={styles.title}>
      <div className={styles.yellowBox}>
      </div>
      <div className={styles.textBox}>
      <p>Popular Recipe</p>
      </div>
      </div>
      <div className={styles.indexCard}>
      {recipe.map((data)=>(
      <div className={styles.Card}>
        <Image className={styles.image} src={data.pict? data.pict: dummy} alt='thumbnail' width={'200px'} height={'200px'}  />
        <p>{data.recipe_name}</p>
      </div>
      ))}
    </div>
        
      </main>

      <footer className={styles.footer}>
        <h2>Eat, Cook, Repeat</h2>
        <p>Share your best recipe by uploading here !</p>
      </footer>
    </div>
  )
}