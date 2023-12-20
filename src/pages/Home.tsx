import { useEffect, useState } from "react";
import style from "./style.module.scss";
import axios from "axios";

interface Article {
  __v: number;
  _id: string;
  category: string;
  comment: any[];
  createdAt: string;
  description: string;
  heading: string;
  updatedAt: string;
}

const Home = () => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8080/api/v1/article");
      console.log(response.data.data.articles);
      if (response.data.status === "success") {
        setArticlesData(response.data.data.articles);
      }
    })();
  }, []);

  return (
    <div className={style.homeContainer}>
      <div className={style.bannerBox}>
        <h1>Punch Line</h1>
      </div>
      <div className={style.articlesBox}>
        {articlesData.map((el) => (
          <div className={style.articleBox} key={el._id}>
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
