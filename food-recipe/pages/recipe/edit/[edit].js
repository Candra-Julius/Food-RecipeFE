/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../../component/Button";
import Footer from "../../../component/Footer";
import withOutAuth from "../../../component/HOC/isLogedIn";
import InputC from "../../../component/InputC";
import NavBar from "../../../component/NavBar";
import style from "../../../styles/editRecipe.module.css";

const EdirRecipe = ({recipe,setIsLoggedIn}) => {
  const router = useRouter();
  const {edit: id} = router.query;
  const [form, setForm] = useState({
    recipe_name: '',
    ingridient:''
  });
  const [previewe, setPreviewe] = useState(undefined)
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
useEffect(()=>{
  if(!image || image.length === 0){
    setPreviewe(undefined)
    return
  }else{
    const object = window.URL.createObjectURL(image)
    setPreviewe(object)
    return () => URL.revokeObjectURL(image)
  }
}, [image])
const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("recipe_name", form.recipe_name);
    formData.append('ingredient', form.ingridient);
    formData.append('image', image)
    fetchData(formData)
    alert('recipe updated')
}
  return (
    <div className={style.container}>
      <NavBar setIsLoggedIn={setIsLoggedIn} />
      <main className={style.main}>
        <form className={style.main}>
          <div className={style.form}>
          {!previewe?
          <div className={style.upload}>
          <label htmlFor="pict"><img src={recipe.pict} alt='previewe'/></label>
          <input
            name="image"
            className={style.uploadPhoto}
            value={''}
            id="pict"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={(e) => handleImage(e)}
          />
        </div>: <div className={style.previewe}><label htmlFor="pict">
        <img src={previewe} className={style.previeweImg} alt='previewe' layout='responsive'/>
        </label>
        <input
            name="image"
            className={style.uploadPhoto}
            value={''}
            id="pict"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={(e) => handleImage(e)}
          />
        </div>}
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
