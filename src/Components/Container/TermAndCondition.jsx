import React, { useState } from "react";
import { Button } from "@mui/material";
import Editor from "react-simple-wysiwyg";
import {
  addTerm,
  getTermsCondition,
  updateTerms,
} from "../../services/Contain";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { SnackBar } from "../Assets/SnackBar";

export default function TermAndCondition() {
  const [addCondition, setAddCondition] = useState("");
  const [getCondition, setGetCondition] = useState([]);
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
      console.log(addCondition);
      if (addCondition !== undefined) {
        let aboutUs1 = isHtml(addCondition)
          ? addCondition.replace(/(<([^>]+)>)/gi, "")
          : addCondition;
        if (aboutUs1.length === 0) {
          errors.useValidation = "Please Enter Terms & Condition";
          setBrandError({ useValidation: "Please Enter Terms & Condition" });
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
        errors.useValidation = "Please Enter Terms & Condition";
        setBrandError({ useValidation: "Please Enter Terms & Condition" });
        return false;
      }
    }
  const addTermCondition = (e, data) => {
     let valid = validationForm();
     if(valid){
                setLoader(true);
                e.preventDefault();
                addTerm(
                  {
                    term_condition: addCondition.split("&nbsp;").join(""),
                  },
                  data
                )
                  .then((res) => {
                    console.log(res);
                    setLoader(false);
                    setFlag(true);
                    setLoader(false);
                    ShowSnackbar({
                      show: true,
                      vertical: "top",
                      horizontal: "right",
                      msg: "Terms & Condition add successfully",
                      type: "success",
                    });
                  })
                  .catch((err) => console.log(err));
              }
  };

  const getAllTermsAndCondition = () => {
     setLoader(true);
    getTermsCondition()
      .then((res) => {
        console.log(res.data.data[0]);
        setAddCondition(res.data.data[0].term_condition);
        setGetCondition(res.data.data[0]);
         setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTermsAndCondition = (id) => {
    let valid = validationForm();
    if(valid){
               setLoader(true);
               updateTerms(id, {
                 term_condition: addCondition.split("&nbsp;").join(""),
               })
                 .then((res) => {
                   console.log(res);
                   getAllTermsAndCondition();
                   setLoader(false);
                   ShowSnackbar({
                     show: true,
                     vertical: "top",
                     horizontal: "right",
                     msg: "Terms & Condition update successfully",
                     type: "success",
                   });
                 })
                 .catch((err) => {
                   console.log(err);
                 });
             }
  };
  useEffect(() => {
    getAllTermsAndCondition();
  }, [flag]);
  return (
    <>
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
          <div className="mx-3">
            <form>
              <h1 style={{ marginTop: "10px" }}>Terms & Condition</h1>
              <br />
              <div>
                <Editor
                  name="TermAndCondition"
                  value={addCondition}
                  onChange={(e) => {
                    setAddCondition(e.target.value);
                     setBrandError({});
                  }}
                  style={{ height: "200px" }}
                />
                {brandError.useValidation ? (
                  <p style={{ color: "red" }}>{brandError.useValidation}</p>
                ) : (
                  ""
                )}
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {getCondition.length !== 0 ? (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={() => updateTermsAndCondition(getCondition._id)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className="btn_primary"
                    variant="contained"
                    onClick={addTermCondition}
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
