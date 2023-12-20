import { useEffect, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Article } from "../interfaces/article";

const Home = () => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8080/api/v1/article");
      console.log(response.data.data.articles);
      if (response.data.status === "success") {
        setArticlesData(response.data.data.articles);
      }
    })();
  }, []);

  const articleNavigator = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className={style.homeContainer}>
      <div className={style.bannerBox}>
        <h1>Punch Line</h1>
      </div>
      <div className={style.articlesBox}>
        {articlesData.map((el) => (
          <div
            className={style.articleBox}
            key={el._id}
            onClick={() => {
              articleNavigator(el._id);
            }}
          >
            <h3>{el?.heading}</h3>
            <hr />
            <p>{el.description}</p>
            <hr />
            <p>category : {el.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
