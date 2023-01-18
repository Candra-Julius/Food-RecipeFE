import Image from 'next/image'
import React from 'react'
import Footer from '../../component/Footer'
import NavBar from '../../component/NavBar'
import style from '../../styles/detailRecipe.module.css'
import dummy from '../../public/assets/image/Rectangle 313.png'
import play from '../../public/assets/image/pnghut_music-icon-play-button-gadget-technology.png'
import axios from 'axios'
import { useRouter } from 'next/router'
import withOutAuth from '../../component/HOC/isLogedIn'

const RecipeDetail = ({recipe, setIsLoggedIn}) => {
  const router = useRouter()
  if(router.isFallback){
    return <h3>Loading. . .</h3>
  }
  return (
    <div className={style.container}>
    <NavBar setIsLoggedIn={setIsLoggedIn}/>
    <main className={style.main}>
    <div className={style.title}>
    <h1>{recipe.recipe_name}</h1>
    <Image src={recipe.pict? recipe.pict : dummy} alt='recipe Picture' width={'100%'} height={'100%'} layout='responsive' />
    </div>
    <div className={style.ingredient} >
    <h3>Ingredients</h3>
    <p>{recipe.ingridient}</p>
    </div>
    </main>
    <Footer/>
    </div>
  )
}
export const getStaticPaths = async() => {
    try {
        
        const {data} = await axios.get(`${process.env.NEXT_API}/home`)
        console.log(data);
        const result = data.hasil
        const paths = result.map((data)=>{
          return{
            params:{
              id: data.id_recipe + ''
            }
          }
        })
        console.log(paths);
        return{
            paths:paths,
            fallback: true
        }
    } catch (error) {
        
    }
}
export const getStaticProps = async(context)=>{
  const {id} = context.params
  const {data} = await axios.get(`${process.env.NEXT_API}/recipe/detail/${id}`)
  const result = data.data
  return {
    props: {
      recipe: result
    },
    revalidate: 10
  }
}

export default RecipeDetail