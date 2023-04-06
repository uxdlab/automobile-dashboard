import { useState } from "react";
import style from "./style.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  TextField,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";


export const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  //   const [showAlert, setShowAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
    if (user === 'admin@gmail.com' && pass === 'admin@123') {
      localStorage.setItem("isLoggedIn", "true");
      console.log('user LogedInnnnn')
      navigate('/')

    }
  }

  return (
    <section className={style.main_sec}>
      <div className={style.left}>
        <img src="/images/logo.png" alt="eee" className="h-100" />
      </div>
      <div className={style.right}>
        <div className={style.inner}>
          {/* <img className="img-style w-50" src="/images/logo.png" alt="Logo" /> */}
          <h1>Welcome</h1>
          <h4>Sign in to your Account</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Enter Your Username"
              type="email"
              fullWidth
              //   value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Typography
              sx={{ fontSize: "14px", mb: 2, color: "gray" }}
            >admin@gmail.com</Typography>
            <FormControl sx={{ mb: 2 }} fullWidth>
              <OutlinedInput
                placeholder="Enter Your Password"
                type={showPass ? "text" : "password"}
                // value={pass}
                onChange={(e) => setPass(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <small style={{ color: "gray" }}>admin@123</small>
            </FormControl>
            {/* <Typography align="right" sx={{ color: "blue" }} my={2}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot password ?
              </span>
            </Typography> */}
            <Button
              variant="contained"
              color="primary"
              sx={{ background: "black", color: "white" }}
              type="submit"
              fullWidth
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
