import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setToken } from "./../../utils/auth.js";
import axios from "axios";
const SignupForm = () => {
  const navigate = useNavigate();
  const jumpToLogin = () => {
    navigate("/");
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const inputHandler = (event) => {
    setData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        }
      );

      console.info("signup successful:", response.data);
      const { status, token } = response.data;
      if (status === "success") {
        setToken(token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.main}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        name="name"
        onChange={inputHandler}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name="email"
        onChange={inputHandler}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={inputHandler}
          name="password"
        />
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Password Confirm
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          onChange={inputHandler}
          name="passwordConfirm"
        />
      </FormControl>
      <Button variant="contained" size="large" onClick={handleLogin}>
        Signup
      </Button>
      <div className={style.msgBlock}>
        <p>
          Already have an Account, go to{" "}
          <span onClick={jumpToLogin}>Login Page!</span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
