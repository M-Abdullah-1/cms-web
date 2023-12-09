import SignupForm from "../components/signupForm/SignupForm";
import style from "./style.module.scss";
const Signup = () => {
  return (
    <div className={style.loginPage}>
      <div className={style.main}>
        <h1>Signup</h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
