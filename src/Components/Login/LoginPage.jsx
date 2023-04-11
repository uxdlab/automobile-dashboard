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
  Backdrop,
  Box,
} from "@mui/material";
import axios from "axios";
import { apis } from "../../auth/api";
import { Triangle } from "react-loader-spinner";


export const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [match, setMatch] = useState(false)
  const [showPass, setShowPass] = useState(false);
  const [loader,setLoader]  = useState(false)
  //   const [showAlert, setShowAlert] = useState(false);

  function handleSubmit(e) {
    setLoader(true)
    e.preventDefault()
    let info = {
      email:user,
      password: pass
}

  axios.post(`${apis.baseUrl}admin/login`,info)
  .then((res)=>{
    console.log(res)
    localStorage.setItem("isLoggedIn", "true");
    setLoader(false)
    navigate('/')
    setMatch(false)
  }).catch((err)=>{
    console.log(err)
    setMatch(true)
  })
    // if (user === 'admin@gmail.com' && pass === 'admin@123') {
    //   localStorage.setItem("isLoggedIn", "true");
    //   console.log('user LogedInnnnn')
    //   navigate('/')

    // }
  }

  return (

    <>
     <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <Box>
                    <Triangle
                        height="80"
                        width="80"
                        color="black"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={loader}
                    />
                </Box>
            </Backdrop>
    <section className={style.main_sec}>
      <div className={style.left}>
        <img src="/images/logo.png" alt="eee" className="h-100 w-100" />
      </div>
      <div className={style.right}>
        <div className={style.inner}>
          {/* <img className="img-style w-50" src="/images/logo.png" alt="Logo" /> */}
          <h1>Welcome</h1>
          <h4>Sign in to your Account</h4>
          {!match?<br />:<h5 style={{color:'red'}}>Please Enter valid Id or Password</h5>}
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
            >test@gmail.com</Typography>
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
              <small style={{ color: "gray" }}>test@1234</small>
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
    </section></>
  );
};
