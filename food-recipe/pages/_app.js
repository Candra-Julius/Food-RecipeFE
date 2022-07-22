import { useEffect } from 'react'
import { useState } from 'react'
import '../styles/globals.css'
import Loading from '../pages/Loading'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  useEffect(()=>{
        setIsLoggedIn(localStorage.getItem('login'))
  }, [])

  return <Component {...pageProps} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
}

export default MyApp
