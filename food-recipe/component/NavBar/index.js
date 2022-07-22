import Link from 'next/link'
import style from './NavBar.module.css'
import Image from 'next/image'
import user from '../../public/assets/image/User icon.jpg'
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

const NavBar = () => {
  const router = useRouter()
  const [isLogin,setIsLogin] = useState(false)
  
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setIsLogin(localStorage.getItem('login'))
    }
  },[])
  const handleLogout = (e) => {
    e.preventDefault()
    axios.get(`${process.env.NEXT_API}/logout`, {withCredentials: true})
    localStorage.removeItem('login')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    router.push('/login')
  }
  return (
    <nav className={style.navbar}>
      <div className={style.nav1}>
      <ul className={style.navli}>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/recipe/newrecipe'>Add recipe</Link></li>
        <li><Link href='/profile'>Profile</Link></li>
      </ul>
      </div>
      <div className={style.nav2}>
      <Image src={user} alt='icon'/>
      
      {isLogin? 
        <ul className={style.dropdownLogin}>
          <li><p onClick={handleLogout} >Logout</p></li>
        </ul>
      :
        <ul className={style.dropdown}>
          <li><Link href='/login'><p>Login</p></Link></li>
          <li><Link href='/register'><p>Register</p></Link></li>
        </ul>
    }
        
        
      </div>
      </nav>
  )
}

export default NavBar