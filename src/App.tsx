import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.js";
import Home from "./pages/Home.js";
import { checkAuthToken } from "./utils/auth.ts";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", loader: checkAuthToken, element: <Home /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
