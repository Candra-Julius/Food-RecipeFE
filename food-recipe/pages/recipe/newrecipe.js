/* eslint-disable @next/next/no-img-element */
import InputC from "../../component/InputC";
import NavBar from "../../component/NavBar";
import style from "../../styles/newrecipe.module.css";
import Button from "../../component/Button";
import Footer from "../../component/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import withOutAuth from "../../component/HOC/isLogedIn";

const Newrecipe = ({setIsLoggedIn}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingridient: "",
    title: "",
  });
  const [previewe, setPreviewe] = useState(undefined)
  const [video, setVideo] = useState([])
  const [image, setImage] = useState([])
  async function fetchData(dataForm) {
    await axios({
      method: "POST",
      baseURL: `${process.env.NEXT_API}`,
      url: "/recipe/new",
      data: dataForm,
      withCredentials: true
    });
  }
  const handleChange = (e) => {
      setNewRecipe({
        ...newRecipe,
        [e.target.name]: e.target.value,
      });
  };
  const handleVideo = (e) => {
    setVideo(e.target.files[0])
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

  useEffect(() => {
    console.log(newRecipe);
    console.log(image);
    console.log(video);
    console.log(previewe);
  }, [newRecipe, image, video, previewe]);

  const handleNewRecipe = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", newRecipe.userID);
    formData.append("name", newRecipe.name);
    formData.append("ingridient", newRecipe.ingridient);
    formData.append("image", image);
    formData.append("video", video);
    formData.append("title", newRecipe.title);
    console.log(formData.get('image'));
    console.log(formData.get('video'));
    fetchData(formData);
    alert("New Recipe Added");
  };

  return (
    <div className={style.container}>
      <NavBar setIsLoggedIn={setIsLoggedIn}/>
      <main className={style.main}>
        <form className={style.main}>
          <div className={style.form}>
              {!previewe?
                <div className={style.upload}>
                <label htmlFor="pict">Add photo</label>
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
              value={newRecipe.name}
              name={"name"}
              type={"input"}
              placeholder={"Title"}
              onChange={(e) => handleChange(e)}
            />
            <div className={style.boxArea}>
              <label htmlFor="text-area" />
              <textarea
                value={newRecipe.ingridient}
                onChange={(e)=>handleChange(e)}
                id="text-area"
                className={style.textArea}
                name={'ingridient'}
                placeholder="Ingedient"
              ></textarea>
            </div>
            <div className={style.sect2}>
              <div className={style.buttonBox}>
                <Button
                  type={"submit"}
                  title={"Post Recipe"}
                  onClick={handleNewRecipe}
                />
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default withOutAuth(Newrecipe);
