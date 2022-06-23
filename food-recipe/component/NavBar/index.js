import Link from 'next/link'
import style from './NavBar.module.css'
import Image from 'next/image'
import user from '../../public/assets/image/User icon.jpg'

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.nav1}>
      <ul className={style.navli}>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/recipe/newrecipe'>Add recipe</Link></li>
        <li><Link href='#'>Profile</Link></li>
      </ul>
      </div>
      <div className={style.nav2}>
      <Image src={user} alt='icon'/>
      <ul className={style.dropdown}>
        <li><Link href='/login'><p>Login</p></Link></li>
        <li><Link href='/register'><p>Register</p></Link></li>
        </ul>
      </div>
      </nav>
  )
}

export default NavBar