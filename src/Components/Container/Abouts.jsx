import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { addabout, getAbout } from "../../services/Contain";

export default function Abouts() {
  const [aboutUS, setAboutUs] = useState("");
  const [aboutUsData, setAboutUsData] = useState([]);
  console.log(aboutUS.about_us);

  const submitAbout = (e, data) => {
    e.preventDefault();
    addabout(
      {
        about_us: aboutUS.split("&nbsp;").join(""),
      },
      data
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getAboutById = () => {
    getAbout()
      .then((res) => {
        let a = res.data.data;
        // console.log(a[0].about_us);
       setAboutUs(res.data.data[0].about_us);
        setAboutUsData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (aboutUS.length === 0) {
      getAboutById();
      console.log("aa");
    }
  });

  return (
    <div>
      <form>
        <h1>About us</h1>
        <br />
        <div>
          <Editor
            name="aboutUs"
            value={aboutUS}
            style={{ minHeight: 200 }}
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
