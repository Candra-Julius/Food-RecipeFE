import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import withOutAuth from "../../../component/HOC/isLogedIn";
import InputC from "../../../component/InputC";
import NavBar from "../../../component/NavBar";
import style from "../../../styles/editRecipe.module.css";

const EdirRecipe = ({recipe}) => {
  const router = useRouter();
  const {edit: id} = router.query;
  const [form, setForm] = useState({
    recipe_name: '',
    ingridient:''
  });
//   const [initialForm, setInitialForm] = useState([])
//   const getData = async()=> {
//     const {data} = await axios.get(`http://localhost:8000/recipe/detail/${id}`)
//     const result = data.data
//     setInitialForm(result)
//   }
//   useEffect(()=>{
//     getData()
//   }, [])
  
  const [image, setImage] = useState([]);
  const fetchData = async (formData) => {
    const token = localStorage.getItem('token')
    const {data: result} = await axios.put(`${process.env.NEXT_API}/recipe/edit/${id}`, formData ,{withCredentials:true, headers:{Authorization: `Bearer ${token}`,}});
    const data = result.data
    console.log(id);
    console.log(data);
    setForm(data);
  };
  useEffect(() => {
    console.log(form);
  },[form]);
const handleChange = (e) =>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}
const handleImage = (e) => {
    setImage(e.target.files[0])
}
const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.recipe_name);
    formData.append('ingridient', form.ingridient);
    formData.append('image', image)
    // console.log(formData.get('image'));
    // console.log(typeof(id));
    fetchData(formData)
    alert('recipe updated')
    // router.push('/profile')
}
  return (
    <div className={style.container}>
      <NavBar />
      <main className={style.main}>
        <form className={style.main}>
        <h1>{}</h1>
          <div className={style.form}>
            <div className={style.upload}>
              <label htmlFor="pict">Add photo</label>
              <input
                name="image"
                className={style.uploadPhoto}
                value={''}
                id="pict"
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleImage}
              />
            </div>
            <InputC
              className={style.title}
              value={form.recipe_name}
              name={"recipe_name"}
              type={"input"}
              placeholder={recipe.recipe_name}
              onChange={(e)=>handleChange(e)}
            />
            <div className={style.boxArea}>
              <label htmlFor="text-area" />
              <textarea
                value={form.ingridient}
                onChange={handleChange}
                id="text-area"
                className={style.textArea}
                name={"ingridient"}
                placeholder={recipe.ingridient}
              ></textarea>
            </div>
            <div className={style.sect2}>
              <div className={style.buttonBox}>
                <Button type={"submit"} title={"Post Recipe"} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
export const getServerSideProps = async(context) => {
    try {
        const {edit: id} = context.params
        const {data} = await axios.get(`${process.env.NEXT_API}/recipe/detail/${id}`)
        const result = data.data
        return{
            props:{recipe: result, id}
        }
    } catch (error) {
        
    }
}

export default withOutAuth(EdirRecipe);
