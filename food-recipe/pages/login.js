import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../component/Button";
import InputC from "../component/InputC";
import style from "../styles/login.module.css";

const Login = () => {
  const router = useRouter()
  const handleLogin = (e)=>{
    router.push('/')
  }
  return (
    <div className={style.container}>
    <div className={style.Fimage}>
    <div className={style.layer}></div>
    </div>
      <div className={style.main}>
        <div className={style.form}>
          <div className={style.welcome}>
            <h2>Welcome</h2>
            <p>Log in into your exiting account</p>
          </div>
          <div className={style.input}>
            <InputC name={'name'} type={'email'} label={'Email'} placeholder={'Email'} />
            <InputC name={'password'} type={'password'} label={'Password'} placeholder={'Password'} />
            <label htmlFor="userAgreement">
            <input type={'checkbox'} id='userAgreement' />
            I agree to terms & conditions</label>
          </div>
          <div className={style.button}>
          <Button title={'Login'} type={'submit'} onClick={()=> handleLogin()}/>
          <Link href='#' className={style.forgot}>Forgot password?</Link>
          </div>
          <p className={style.reg}>Don’t have an account? <Link href={'./register'}>Sign Up</Link></p>
        </div>
      </div> 
    </div>
  );
};

export default Login;
