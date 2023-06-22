import React from 'react'
import { Button } from "@mui/material";
import Editor from "react-simple-wysiwyg";
import { addPrivacy, getPrivacy, updatePrivacy } from "../../services/Contain";
import { useState } from 'react';
import { useEffect } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";

export default function PrivacyPolicy() {
  const [addPolicy,setAddPolicy] = useState("")
  const [policyData,setPolicyData] = useState([])
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);

  const submitPolicy = (e,data)=>{
     setLoader(true);
     e.preventDefault();
     addPrivacy(
       {
         privacy_policy: addPolicy.split("&nbsp;").join(""),
       },
       data
     )
     .then((res)=>{console.log(res)
   setLoader(false);
   setFlag(true);})
     .catch((err)=>console.log(err))
  }
  const getAllPrivacy = ()=>{
      getPrivacy()
      .then((res)=>{console.log(res);
       setAddPolicy(res.data.data[0].privacy_policy);
       setPolicyData(res.data.data[0]);})
      .catch((err)=>console.log(err))
  }
  const updatePrivacyAndPolicy = (id)=>{
      setLoader(true);
      updatePrivacy(id, {
        privacy_policy: addPolicy.split("&nbsp;").join(""),
      })
      .then((res)=>{console.log(res)
      getAllPrivacy();
    setLoader(false);})
      .catch((err)=>{console.log(err)});
  }
  useEffect(() => {
    getAllPrivacy();
  }, [flag]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loader ? (
        <div>
          <form>
            <h1>Privacy Policy</h1>
            <br />
            <div>
              <Editor
                name="private-Policy"
                value={addPolicy}
                style={{ height: "200px" }}
                onChange={(e) => {
                  console.log(e.target.value);
                  setAddPolicy(e.target.value);
                }}
              />
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
  );
}
