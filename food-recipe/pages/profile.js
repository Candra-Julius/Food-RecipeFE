import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import style from '../styles/Profile.module.css'
import dummy from '../public/assets/image/No_image_available.svg.webp'
import imgRecipeDefault from '../public/assets/image/1471262.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../component/Card'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const [recipe, setRecipe] = useState([])
  async function fetchData() {
    const {data: result} = await axios.get('http://localhost:8000/users/myprofile', {withCredentials: true})
    setProfile(result.data);
    setRecipe(result.data.recipe)
  }
  console.log(recipe);
useEffect(()=>{
  fetchData()
},[])
  return (
    <div className={style.container}>
    <NavBar/>
    <div className={style.profile}>
        <Image src={dummy} height={'90%'} width={'90%'} alt={'Profile Image'}/>
        <h2>{profile.name}</h2>
    </div>
    <div className={style.list}>
    <p>My Recipe</p>
    </div>
    {recipe&& <div className={style.recipe}>
    {recipe.map((data)=>(
      // eslint-disable-next-line react/jsx-key
      // <Card image={data.pict? data.pict: imgRecipeDefault} title={'title'} />
      <div className={style.image} key={data.recipe_id}>
      <Image className={style.image} src={data.pict? data.pict: dummy} alt='thumbnail' width={'100%'} height={'100%'} layout="responsive" />
      <p>{data.recipe_name}</p>
      </div>
      ))}
    </div>}
    
    <Footer/>
    </div>
  )
}

export default Profile