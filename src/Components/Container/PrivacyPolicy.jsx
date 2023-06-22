import React from 'react'
import { Button } from "@mui/material";
import Editor from "react-simple-wysiwyg";
import { addPrivacy, getPrivacy } from "../../services/Contain";
import { useState } from 'react';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  const [addPolicy,setAddPolicy] = useState("")
  const [policyData,setPolicyData] = useState([])

  const submitPolicy = (e,data)=>{
     e.preventDefault();
     addPrivacy(
       {
         privacy_policy: addPolicy.split("&nbsp;").join(""),
       },
       data
     )
     .then((res)=>{console.log(res)
   })
     .catch((err)=>console.log(err))
  }
  const getAllPrivacy = ()=>{
      getPrivacy()
      .then((res)=>{console.log(res);
       setAddPolicy(res.data.data[0].privacy_policy);
       setPolicyData(res.data.data[0]);})
      .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    if(addPolicy.length ===0){
      getAllPrivacy();
      console.log("addPolicy")
    }
  })

  return (
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
          <Button
            className="btn_primary"
            variant="contained"
            onClick={submitPolicy}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
