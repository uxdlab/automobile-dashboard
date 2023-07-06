import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Triangle } from "react-loader-spinner";
import Product from "./Product";
import { addItem } from "../../services/Item";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { SnackBar } from "../Assets/SnackBar";
import { getAllItem } from "../../services/Item";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [useValidation, setUseValidation] = useState("");
  const [brandError, setBrandError] = useState("");
  const [modelValidation, setModelValidation] = useState("");

  const AllProducts = useRef([
    {
      product_name: "",
      oe_reference_number: "",
      product_description: "",
      MRP: "",
      ke_partNumber: "",
      image: [],
      product_segment_aaray: [],
      product_brand_aaray: [],
      product_model_aaray: [],
      product_category_aaray: [],
      product_manufacture_aaray: [],
      brand_name: "",
      segment_name: "",
      model_name: "",
    },
  ]);
  function validationForm() {
    let errors = {};
    if (useValidation !== undefined) {
      console.log(useValidation.length);
      if (useValidation.length === 0) {
        // alert("please select brand");
        errors.useValidation = "Please select brand";
        setBrandError({ useValidation: "Please select brand" });
        return false;
      } else {
        if (modelValidation.length === 0) {
          // alert("please select modal");
          setBrandError({ modelValidation: "Please select model" });

          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }
  useEffect(() => {
    getAllItem()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const promises = [];
    setLoader(true);

    if (files.length !== 0) {
      files.map((item) => {
        console.log(item);
        // return
        const storageRef = ref(storage, `image${Math.random()}${item.name}`); 
        const uploadTask = uploadBytesResumable(storageRef, item);
        console.log(uploadTask)
        promises.push(uploadTask);

      });

      if (files.length === promises.length) {
        Promise.all(promises)
          .then((res) => {
            let urls = [];
            res.map((res2, index) => {
              getDownloadURL(res2.ref).then((url) => {
                urls.push(url);
                console.log(urls);
                if (index == files.length - 1) {
                  console.log(urls);
                  setTimeout(()=>{ AllProducts.current[0].image = [...urls];

                                   addItem(AllProducts.current[0])
                                     .then((res) => {
                                       setLoader(false);
                                       navigate("/product");
                                       sessionStorage.setItem("added", "true");
                                     })
                                     .catch((err) => {
                                       console.log(err);
                                     });},1000)
                 
                }
              });
            });
          })
          .catch((err) => console.log(err));
          
      }
    } else {
      setLoader(false);
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Please Upload Images",
        type: "error",
      });
    }
  };

  const ExistNameCheck = (e) => {
    e.preventDefault();
    let valid = validationForm();
    if (valid) {
      if (files.length !== 0) {
        let arr = data.filter(
          (item) => item.product_name === AllProducts.current[0].product_name
        );
        if (arr.length !== 0) {
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Product Already Exist",
            type: "error",
          });
        } else {
          submitForm(e);
        }
      } else {
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Please Upload Images",
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <Box>
          <Triangle
            height="80"
            width="80"
            color="black"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={loader}
          />
        </Box>
      </Backdrop>

      <Typography variant="h4" className="text-center" mx={2} mt={2}>
        Add Product
      </Typography>
      {!loader ? (
        <form onSubmit={ExistNameCheck}>
          {AllProducts.current.map((pro, index) => {
            return (
              <Product
                setBrandError={setBrandError}
                useValidation={useValidation}
                brandError={brandError}
                setUseValidation={setUseValidation}
                setModelValidation={setModelValidation}
                files={files}
                setFiles={setFiles}
                key={index}
                AllProducts={AllProducts}
                index={index}
              />
            );
          })}

          <Grid container className="d-flex justify-content-center pb-5">
            {/* <Grid item xl={5} md={6} sm={12} sx={12}>
                            <Box align='right' mt={6}>
                                <Button className="cancel_btn me-3" onClick={() => navigate('/product')}>Cancel</Button>
                                <Button type='submit' className='custom-btn' variant="contained">Save</Button>
                            </Box>
                        </Grid> */}
          </Grid>
        </form>
      ) : null}
    </>
  );
}
