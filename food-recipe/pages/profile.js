import Footer from '../component/Footer'
import NavBar from '../component/NavBar'
import style from '../styles/Profile.module.css'
import dummy from '../public/assets/image/No_image_available.svg.webp'
import imgRecipeDefault from '../public/assets/image/1471262.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../component/Card'
import Link from 'next/link'
import { useRouter } from 'next/router'
import withOutAuth from '../component/HOC/isLogedIn'

const Profile = () => {
  const router = useRouter()
  const [profile, setProfile] = useState([])
  const [recipe, setRecipe] = useState([])
  async function fetchData() {
    const token = localStorage.getItem('token')
    const {data: result} = await axios.get(`${process.env.NEXT_API}/users/myprofile`, {
      withCredentials: true,
      headers:{ Authorization: `Bearer ${token}`,}
    })
    setProfile(result.data);
    setRecipe(result.data.recipe)
  }
  console.log(recipe);
useEffect(()=>{
  fetchData()
},[])
  const handleDelete = async(id) => {
    await axios.delete(`${process.env.NEXT_API}/recipe/delete/${id}`, {withCredentials: true})
  }
  const handleEdit = (id) => {
    router.push(`/recipe/edit/${id}`)
  }
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
      
      <div className={style.Card} key={data.recipe_id}>
      <button className={style.delete} type='button' onClick={()=>handleDelete(data.recipe_id)} >X</button>
      <button className={style.edit} type='button' onClick={()=>handleEdit(data.recipe_id)} >...</button>
      <Link href={`/recipe/${data.recipe_id}`} >
      <div className={style.image} >
      <Image className={style.image} src={data.pict? data.pict: dummy} alt='thumbnail' width={'100%'} height={'100%'} layout="responsive" />
      <p>{data.recipe_name}</p>
      </div>
      </Link>
      </div>
      ))}
    </div>}
    
    <Footer/>
    </div>
  )
}


export default withOutAuth(Profile)