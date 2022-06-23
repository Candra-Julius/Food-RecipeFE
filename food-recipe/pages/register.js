import Link from "next/link";
import Button from "../component/Button";
import InputC from "../component/InputC";
import style from "../styles/register.module.css";

const register = () => {
  return (
    <div className={style.container}>
    <div className={style.Fimage}>
    <div className={style.layer}></div>
    </div>
      <div className={style.main}>
        <div className={style.form}>
          <div className={style.welcome}>
            <h2>Let’s Get Started !</h2>
            <p>Create new account to access all features</p>
          </div>
          <div className={style.input}>
            <InputC name={'name'} type={'input'} label={'Name'} placeholder={'Input Your Name Here'} />
            <InputC name={'email'} type={'email'} label={'Email Address*'} placeholder={'Enter Email Address'} />
            <InputC name={'phone'} type={'input'} label={'Phone Number'} placeholder={'08xxxxxxxxx'} />
            <InputC name={'password'} type={'password'} label={'Create New Password'} placeholder={'Create New Password'} />
            <InputC name={'password'} type={'password'} label={'New Password'} placeholder={'New Password'} />
            <label htmlFor="userAgreement">
            <input type={'checkbox'} id='userAgreement' />
            I agree to terms & conditions</label>
          </div>
          <div className={style.button}>
          <Button title={'Register Account'} type={'submit'} onClick={''}/>
          </div>
          <p className={style.reg}>Already have account? <Link href={'./login'}>Log in Here</Link></p>
          </div>
      </div> 
    </div>
  );
};

export default register;
