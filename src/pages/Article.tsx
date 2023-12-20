import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Article } from "../interfaces/article";

const Article = () => {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/article/${id}`
        );
        const { article } = response.data.data;
        setArticle(article);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!article) return <></>;

  return (
    <div>
      <h1>{article.heading}</h1>
      <p>{article.description}</p>
    </div>
  );
};

export default Article;
