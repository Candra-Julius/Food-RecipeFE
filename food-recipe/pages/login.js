import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../component/Button";
import InputC from "../component/InputC";
import style from "../styles/login.module.css";

const Login = () => {
  const router = useRouter()  
  const [err, setErr] = useState([])
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e)=>{
    try {
      e.preventDefault()

    const {data} = await axios.post(`${process.env.NEXT_API}/login`, form, {withCredentials: true} )
    localStorage.setItem('login', data.payload.isLogin)
    router.push('/')
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message)
    }
  }
  return (
    <div className={style.container}>
    <div className={style.Fimage}>
    <div className={style.layer}></div>
    </div>
      <div className={style.main}>
        <form onSubmit={handleLogin} className={style.form}>
          <div className={style.welcome}>
            <h2>Welcome</h2>
            <p>Log in into your exiting account</p>
            {err? <p>{err}</p>: <p/>}
          </div>
          <div className={style.input}>
            <InputC name={'email'} type={'email'} label={'Email'} placeholder={'Email'} onChange={handleChange} />
            <InputC name={'password'} type={'password'} label={'Password'} placeholder={'Password'} onChange={handleChange} />
            <label htmlFor="userAgreement">
            <input type={'checkbox'} id='userAgreement' />
            I agree to terms & conditions</label>
          </div>
          <div className={style.button}>
          <Button title={'Login'} type={'submit'} onClick={handleLogin}/>
          <Link href='#' className={style.forgot}>Forgot password?</Link>
          </div>
          <p className={style.reg}>Don’t have an account? <Link href={'./register'}>Sign Up</Link></p>
        </form>
      </div> 
    </div>
  );
};

export default Login;
