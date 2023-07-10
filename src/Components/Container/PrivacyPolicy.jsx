import React from 'react'
import { Button } from "@mui/material";
import Editor from "react-simple-wysiwyg";
import { addPrivacy, getPrivacy, updatePrivacy } from "../../services/Contain";
import { useState } from 'react';
import { useEffect } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { SnackBar } from "../Assets/SnackBar";

export default function PrivacyPolicy() {
  const [addPolicy,setAddPolicy] = useState("")
  const [policyData,setPolicyData] = useState([])
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
   function isHtml(input) {
     return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(
       input
     );
   }
     function validationForm() {
       let errors = {};
       console.log(addPolicy);
       if (addPolicy !== undefined) {
         let aboutUs1 = isHtml(addPolicy)
           ? addPolicy
               .replace( /(<([^>]+)>)/ig, '')
           : addPolicy;
         if (aboutUs1.length === 0) {
           errors.useValidation = "Please Enter Privacy Policy";
           setBrandError({ useValidation: "Please Enter Privacy Policy" });
           return false;
         } else {
           // if (modelValidation.length === 0) {
           //   // alert("please select modal");
           //   setBrandError({ modelValidation: "Please select model" });

           //   return false;
           // }
           return true;
         }
       } else {
         errors.useValidation = "Please Enter Privacy Policy";
         setBrandError({ useValidation: "Please Enter Privacy Policy" });
         return false;
       }
     }

  const submitPolicy = (e,data)=>{
    let valid = validationForm();
    console.log(valid);
    if(valid){
               setLoader(true);
               e.preventDefault();
               addPrivacy(
                 {
                   privacy_policy: addPolicy.split("&nbsp;").join(""),
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
                     msg: "Privacy Policy add successfully",
                     type: "success",
                   });
                 })
                 .catch((err) => console.log(err));
             }
  }
  const getAllPrivacy = ()=>{
      setLoader(true);
      getPrivacy()
      .then((res)=>{console.log(res);
       setAddPolicy(res.data.data[0].privacy_policy);
       setPolicyData(res.data.data[0]);
        setLoader(false);})
       
      .catch((err)=>console.log(err))
  }
  const updatePrivacyAndPolicy = (id)=>{
    let valid = validationForm();
    console.log(valid);
    if(valid){
               setLoader(true);
               updatePrivacy(id, {
                 privacy_policy: addPolicy.split("&nbsp;").join(""),
               })
                 .then((res) => {
                   console.log(res);
                   getAllPrivacy();
                   setLoader(false);
                   ShowSnackbar({
                     show: true,
                     vertical: "top",
                     horizontal: "right",
                     msg: "Privacy Policy update successfully",
                     type: "success",
                   });
                 })
                 .catch((err) => {
                   console.log(err);
                 });
             }
  }
  useEffect(() => {
    getAllPrivacy();
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
              <h1 style={{ marginTop: "10px" }}>Privacy Policy</h1>
              <br />
              <div>
                <Editor
                  name="private-Policy"
                  value={addPolicy}
                  style={{ height: "200px" }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAddPolicy(e.target.value);
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
                {policyData.length !== 0 ? (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={() => updatePrivacyAndPolicy(policyData._id)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={submitPolicy}
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
