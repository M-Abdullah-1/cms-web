import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.js";
import Home from "./pages/Home.js";
import { checkAuthToken } from "./utils/auth.ts";
import Article from "./pages/Article.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", loader: checkAuthToken, element: <Home /> },
  { path: "/article/:id", loader: checkAuthToken, element: <Article /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
