import InputC from "../../component/InputC";
import NavBar from "../../component/NavBar";
import style from "../../styles/newrecipe.module.css";
import Button from "../../component/Button";
import Footer from "../../component/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Newrecipe = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingridient: "",
    title: "",
  });
  const [video, setVideo] = useState([])
  const [image, setImage] = useState([])
  async function fetchData(dataForm) {
    await axios({
      method: "POST",
      baseURL: "http://localhost:8000/",
      url: "recipe/new",
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
  useEffect(() => {
    console.log(newRecipe);
    console.log(image);
    console.log(video);
  }, [newRecipe, image, video]);

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
      <NavBar />
      <main className={style.main}>
        <form className={style.main}>
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
                  onChange={(e) => handleImage(e)}
                />
              </div>
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
              <div className={style.uploadVid}>
                <label htmlFor="vid">Add videos</label>
                <input
                  name="video"
                  className={style.vid}
                  value={''}
                  id="vid"
                  type="file"
                  accept=".mp4"
                  onChange={(e)=>handleVideo(e)}
                />
              </div>
              <InputC
                className={style.title}
                value={newRecipe.title}
                name={"title"}
                type={"input"}
                placeholder={"Video Title"}
                onChange={(e)=>handleChange(e)}
              />
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

export default Newrecipe;
