import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../interfaces/user";
import { Article } from "../interfaces/article";
const Author = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { authorId } = params;
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      const [authorRes, articleRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/v1/user/${authorId}`),
        axios.get(`http://localhost:8080/api/v1/author/${authorId}/article`),
      ]);
      const { user: author } = authorRes.data.data;
      const { articles } = articleRes.data.data;
      setUser(author);
      setArticles(articles);
    })();
  }, []);

  const articleNavigator = (articleId, authorId) => {
    navigate(`/article/${articleId}/author/${authorId}`);
  };

  if (!user) return <></>;

  return (
    <div>
      <h1>Author Page</h1>
      <p>Name : {user.name}</p>
      <p>email : {user.email}</p>
      <p>about : {user.about}</p>
      <hr />
      <h2>Latest Articles</h2>
      {articles.map((el) => (
        <div
          key={el._id}
          onClick={() => {
            articleNavigator(el._id, el.author);
          }}
        >
          <h3>{el.heading}</h3>
        </div>
      ))}
    </div>
  );
};

export default Author;
