import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Article } from "../interfaces/article";
import { User } from "../interfaces/user";

const Article = () => {
  const params = useParams();
  const { articleId, authorId } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const [articleResponse, userResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/article/${articleId}`),
          axios.get(`http://localhost:8080/api/v1/user/${authorId}`),
        ]);
        const { article } = articleResponse.data.data;
        const { user: userData } = userResponse.data.data;
        setArticle(article);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!article || !user) return <></>;

  return (
    <div>
      <p>Author : {user.name}</p>
      <h1>{article.heading}</h1>
      <p>{article.description}</p>
    </div>
  );
};

export default Article;
