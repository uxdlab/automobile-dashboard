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

export default function TermAndCondition() {
  const [addCondition, setAddCondition] = useState("");
  const [getCondition, setGetCondition] = useState([]);
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);

  const addTermCondition = (e, data) => {
     setLoader(true);
    e.preventDefault();
    addTerm(
      {
        term_condition: addCondition.split("&nbsp;").join(""),
      },
      data
    )
      .then((res) =>{console.log(res)
      setLoader(false);
      setFlag(true);})
      .catch((err) => console.log(err));
  };

  const getAllTermsAndCondition = () => {
    getTermsCondition()
      .then((res) => {
        console.log(res.data.data[0]);
        setAddCondition(res.data.data[0].term_condition);
        setGetCondition(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTermsAndCondition = (id) => {
    setLoader(true);
    updateTerms(id, {
      term_condition: addCondition.split("&nbsp;").join(""),
    })
      .then((res) => {
        console.log(res);
        getAllTermsAndCondition();
         setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllTermsAndCondition();
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
  );
}
