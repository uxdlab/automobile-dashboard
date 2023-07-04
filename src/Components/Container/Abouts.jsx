import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { addabout, getAbout, updataAbout } from "../../services/Contain";
import { Backdrop, CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { SnackBar } from "../Assets/SnackBar";

export default function Abouts() {
  const [aboutUS, setAboutUs] = useState("");
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);
   const [snackbar, ShowSnackbar] = useState({
     show: false,
     vertical: "top",
     horizontal: "right",
     msg: "data added",
     type: "error",
   });
   const [brandError, setBrandError] = useState("");
    const [useValidation, setUseValidation] = useState();
  // const [updateAbout, setUpdateAbout] = useState("")
  console.log(aboutUS.about_us);

  function validationForm() {
    let errors = {};
    console.log(aboutUS)
    if (aboutUS!==undefined){
       let aboutUs1 = aboutUS.includes("</div>")
         ? (aboutUS
             .split(">")[1]
             .split("<")[0]
             .trim())
         : aboutUS ; 
                  if (aboutUs1.length === 0) {
                    errors.useValidation = "Please Enter About Us";
                    setBrandError({ useValidation: "Please Enter About Us" });
                    return false;
                  } else {
                    // if (modelValidation.length === 0) {
                    //   // alert("please select modal");
                    //   setBrandError({ modelValidation: "Please select model" });

                    //   return false;
                    // }
                    return true;
                  }
                }else{
                   errors.useValidation = "Please Enter About Us";
                   setBrandError({ useValidation: "Please Enter About Us" });
                   return false;
                }
  }

  const submitAbout = (e, data) => {
      let valid = validationForm();
      console.log(valid);
      if(valid){
                 setLoader(true);
                 e.preventDefault();
                 addabout(
                   {
                     about_us: aboutUS.split("&nbsp;").join(""),
                   },
                   data
                 )
                   .then((res) => {
                     console.log(res);
                     setLoader(false);
                     setFlag(true);
                     ShowSnackbar({
                       show: true,
                       vertical: "top",
                       horizontal: "right",
                       msg: "About us add successfully",
                       type: "success",
                     });
                   })
                   .catch((err) => console.log(err));
               }
  };

  const getAboutById = () => {
    getAbout()
      .then((res) => {
        let a = res.data.data;
        
        // console.log(a[0].about_us);
        setAboutUs(res.data.data[0].about_us);
        setAboutUsData(res.data.data[0]);
        //  ShowSnackbar({
        //    show: true,
        //    vertical: "top",
        //    horizontal: "right",
        //    msg: "About us add successfully",
        //    type: "success",
        //  });
      })
      .catch((err) => console.log(err));
  };
  const updateTermsAndCondition = (id) => {

    let valid = validationForm();
    console.log(valid)
    if(valid){
          setLoader(true);
               updataAbout(id, {
                 about_us: aboutUS.split("&nbsp;").join(""),
               })
                 .then((res) => {
                   console.log(res);
                   getAboutById();
                   setLoader(false);
                   ShowSnackbar({
                     show: true,
                     vertical: "top",
                     horizontal: "right",
                     msg: "About us update successfully",
                     type: "success",
                   });
                 })

                 .catch((err) => {
                   console.log(err);
                 });
             }
  };
  useEffect(() => {
    getAboutById();
  }, [flag]);

  return (
    <>
      {" "}
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          // onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
          <Triangle
            height="80"
            width="80"
            color="black"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={loader}
          />
        </Backdrop>
        {!loader ? (
          <div className=" mx-3">
            <form>
              <h1 style={{ marginTop: "10px" }}>About us</h1>
              <br />
              <div>
                <Editor
                  name="aboutUs"
                  value={aboutUS}
                  style={{ minHeight: 200 }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAboutUs(e.target.value);
                    setBrandError({});
                  }}
                />
                {brandError.useValidation ? (
                  <p style={{ color: "red" }}>{brandError.useValidation}</p>
                ) : (
                  ""
                )}
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {aboutUsData.length !== 0 ? (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={() => updateTermsAndCondition(aboutUsData._id)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={submitAbout}
                  >
                    Add
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="customH"></div>
        )}
      </div>
    </>
  );
}
