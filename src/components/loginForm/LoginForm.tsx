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
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setToken } from "./../../utils/auth.ts";
const LoginForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const { status, token } = response.data;
      if (status === "success") {
        setToken(token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const jumpToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={style.main}>
      <TextField
        name="email"
        id="outlined-basic"
        label="email"
        onChange={inputHandler}
        variant="outlined"
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
      <Button variant="contained" size="large" onClick={handleLogin}>
        Login
      </Button>
      <div className={style.msgBlock}>
        <p>
          Or create a <span onClick={jumpToSignup}>New Account!</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
