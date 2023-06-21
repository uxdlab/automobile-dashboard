import {Button,} from "@mui/material";
import React from 'react'
import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { addabout } from "../../services/Contain";

export default function Abouts() {
const [aboutUS,setAboutUs] = useState("")

const submitAbout = (e,data)=>{
     e.preventDefault();
    addabout(
      {
        about_us: aboutUS.split("&nbsp;").join(""),
      },
      data
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

}


  return (
    <div>
      <form>
        <h1>About us</h1>
        <br />
        <div>
          <Editor
            name="aboutUs"
            value={aboutUS}
            style={{ height: "200px" }}
            onChange={(e) => {
              console.log(e.target.value);

              setAboutUs(e.target.value);
            }}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="btn_primary"
            variant="contained"
            onClick={submitAbout}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
