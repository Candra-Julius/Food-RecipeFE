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
    userID: "123123",
    name: "",
    ingridient: "",
    image: "",
    video: "",
    title: "",
  });
  async function fetchData(dataForm) {
    await axios({
      method: "POST",
      baseURL: "http://localhost:8000/",
      url: "recipe/new",
      data: dataForm,
    });
  }
  const handleChange = (e) => {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(newRecipe);
  }, [newRecipe]);

  const handleNewRecipe = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", newRecipe.userID);
    formData.append("name", newRecipe.name);
    formData.append("ingridient", newRecipe.ingridient);
    formData.append("image", newRecipe.image);
    formData.append("video", newRecipe.video);
    formData.append("title", newRecipe.title);
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
                  value={newRecipe.image}
                  id="pict"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  onChange={(e) => handleChange(e)}
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
                id="opinion"
                className={style.textArea}
                name="text-area"
                placeholder="Ingedient"
              ></textarea>
            </div>
            <div className={style.sect2}>
              <div className={style.uploadVid}>
                <label htmlFor="vid">Add videos</label>
                <input
                  name="video"
                  className={style.vid}
                  value={newRecipe.video}
                  id="vid"
                  type="file"
                  accept=".mp4"
                  onChange={(e)=>handleChange(e)}
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
