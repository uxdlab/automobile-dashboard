import React from "react";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


export default function Onboarding() {
  const [imgURLs, setimgURLs] = useState([]);

  const imgPrev =()=>{

  }
  return (
    <div>
      <h1>OnBoarding</h1>

      <div className="w-100 d-flex flex-wrap">
        {imgURLs.map((item, index) => (
          <div key={index} className=" mb-1 pe-1 relative box_style border">
            <CancelIcon
              sx={{ fontSize: "12px", color: "red" }}
              className="close-btn-position"
            />
            <img className="img-style" src={item} />
          </div>
        ))}
        <div className="box_style img-btn">
          <div className="btn w-100">
            <input type="file" multiple id="2actual-btn" hidden />
            <label className="text-center text-gray" htmlFor="2actual-btn">
              <CloudUploadIcon />
              <br />
              <span>Upload</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
