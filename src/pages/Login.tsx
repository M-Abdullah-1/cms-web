import LoginForm from "../components/loginForm/LoginForm";
import style from "./style.module.scss";

const Login = () => {
  return (
    <div className={style.loginPage}>
      <div className={style.main}>
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
