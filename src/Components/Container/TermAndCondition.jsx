import React, { useState } from 'react'
import { Button } from "@mui/material";
import Editor from "react-simple-wysiwyg";
import { addTerm, getTermsCondition } from "../../services/Contain";
import { useEffect } from 'react';

export default function TermAndCondition() {
  const [addCondition, setAddCondition] = useState("");
  const [getCondition,setGetCondition] = useState([]);

  const addTermCondition = (e,data)=>{
     e.preventDefault();
     addTerm(
       {
         term_condition: addCondition.split("&nbsp;").join(""),
       },
       data
     )
       .then((res) => console.log(res))
       .catch((err) => console.log(err));
  }

  const getAllTermsAndCondition = ()=>{
      getTermsCondition()
      .then((res)=>{console.log(res);
        setAddCondition(res.data.data[0].term_condition);
        setGetCondition(res.data.data[0])
      })
      .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
    if(addCondition.length ===0){
      getAllTermsAndCondition()
    }
  })
  return (
    <div>
      <form>
        <h1>Term And Condition</h1>
        <br />
        <div>
          <Editor
            name="TermAndCondition"
            value={addCondition}
            onChange={(e) => {
              setAddCondition(e.target.value);
            }}
            style={{ height: "200px" }}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="btn_primary"
            variant="contained"
            onClick={addTermCondition}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
