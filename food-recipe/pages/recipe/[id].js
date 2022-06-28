import Image from 'next/image'
import React from 'react'
import Footer from '../../component/Footer'
import NavBar from '../../component/NavBar'
import style from '../../styles/detailRecipe.module.css'
import dummy from '../../public/assets/image/Rectangle 313.png'
import play from '../../public/assets/image/pnghut_music-icon-play-button-gadget-technology.png'
import axios from 'axios'

const RecipeDetail = ({recipe}) => {
  return (
    <div className={style.container}>
    <NavBar/>
    <main className={style.main}>
    <div className={style.title}>
    <h1>{recipe.recipe_name}</h1>
    <Image src={recipe.pict? recipe.pict : dummy} alt='recipe Picture' width={'100%'} height={'100%'} layout='responsive' />
    </div>
    <div className={style.ingredient} >
    <h3>Ingredients</h3>
    <p>{recipe.ingridient}</p>
    </div>
    <div className={style.videos}>
    <div className={style.videoButton}>
    <Image className={style.buttonImage} alt='' src={play}  width={'20%'} height={'20%'} />
    </div>
    </div>
    </main>
    <Footer/>
    </div>
  )
}
export const getServerSideProps = async(context) => {
    try {
        const {id} = context.params
        const {data} = await axios.get(`http://localhost:8000/recipe/detail/${id}`)
        const result = data.data
        return{
            props:{recipe: result}
        }
    } catch (error) {
        
    }
}

export default RecipeDetail