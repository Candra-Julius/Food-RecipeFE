import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Button from "../component/Button";
import withAuth from "../component/HOC/isLogedOut";
import InputC from "../component/InputC";
import style from "../styles/register.module.css";

const Register = () => {
  const [err, setErr] = useState([])
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vPassword: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (form.password !== form.vPassword) {
        setErr("Password did not match");
      } else {
        const {data: response} = await axios
          .post(`${process.env.NEXT_API}/register`, form)
          if(error){
          setErr(response.message)
      }else{
        alert(response.message)
      }
    }
    } catch (error) {
      alert("somethings wrong");
    }
      
  };
  return (
    <div className={style.container}>
      <div className={style.Fimage}>
        <div className={style.layer}></div>
      </div>
      <div className={style.main}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.welcome}>
            <h2>Let’s Get Started !</h2>
            <p>Create new account to access all features</p>
            {err? <p>{err}</p>:<p/>}
          </div>
          <div className={style.input}>
            <InputC
              name={"name"}
              type={"input"}
              label={"Name"}
              placeholder={"Input Your Name Here"}
              onChange={handleChange}
            />
            <InputC
              name={"email"}
              type={"email"}
              label={"Email Address*"}
              placeholder={"Enter Email Address"}
              onChange={handleChange}
            />
            <InputC
              name={"phone"}
              type={"input"}
              label={"Phone Number"}
              placeholder={"08xxxxxxxxx"}
              onChange={handleChange}
            />
            <InputC
              name={"password"}
              type={"password"}
              label={"Create New Password"}
              placeholder={"Create New Password"}
              onChange={handleChange}
            />
            <InputC
              name={"vPassword"}
              type={"password"}
              label={"New Password"}
              placeholder={"New Password"}
              onChange={handleChange}
            />
            <label htmlFor="userAgreement">
              <input type={"checkbox"} id="userAgreement" />I agree to terms &
              conditions
            </label>
          </div>
          <div className={style.button}>
            <Button title={"Register Account"} type={"submit"} onClick={handleSubmit} />
          </div>
          <p className={style.reg}>
            Already have account? <Link href={"./login"}>Log in Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default withAuth(Register);
