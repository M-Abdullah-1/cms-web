import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.js";
import Home from "./pages/Home.js";
import { checkAuthToken } from "./utils/auth.ts";
import Article from "./pages/Article.tsx";
import Author from "./pages/author.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", loader: checkAuthToken, element: <Home /> },
  {
    path: "/article/:articleId/author/:authorId",
    loader: checkAuthToken,
    element: <Article />,
  },
  {
    path: "/author/:authorId",
    loader: checkAuthToken,
    element: <Author />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
