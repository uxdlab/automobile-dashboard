import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { addabout, getAbout, updataAbout } from "../../services/Contain";
import { Backdrop, CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";

export default function Abouts() {
  const [aboutUS, setAboutUs] = useState("");
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);
  // const [updateAbout, setUpdateAbout] = useState("")
  console.log(aboutUS.about_us);

  const submitAbout = (e, data) => {
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
      })
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
  const updateTermsAndCondition = (id) => {
    setLoader(true);
    updataAbout(id, {
      about_us: aboutUS.split("&nbsp;").join(""),
    })
      .then((res) => {
        console.log(res);
        getAboutById();
        setLoader(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAboutById();
  }, [flag]);

  return (
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
  );
}
