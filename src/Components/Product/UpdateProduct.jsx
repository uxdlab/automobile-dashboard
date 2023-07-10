import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editItem, getAllItem, getItem } from "../../services/Item";
import {
  Backdrop,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  modalClasses,
} from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { CallMultipleApi } from "../../services/CallMultipleApi";
import { apis } from "../../auth/api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { SnackBar } from "../Assets/SnackBar";
import { ContactSupportOutlined } from "@mui/icons-material";

export default function UpdateProduct() {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productData, setProductData] = useState({});
  const [allProductData, setAllProductData] = useState([]);
  const [imgURLs, setimgURLs] = useState([]);
  const [checkURL, setCheckURL] = useState([]);
  const [newImgURL, setNewImgURL] = useState([]);
  const [files, setFiles] = useState([]);
  const [segment, setSegment] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectModel, setSelectModel] = useState([]);
  const [useValidation, setUseValidation] = useState();
  const [modelValidation, setModelValidation] = useState("");
  const [brandError, setBrandError] = useState("");
  const [modelError, setModelError] = useState("");
  const [uploadimg, setUploadImg] = useState([]);

  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const AllProducts = useRef([]);
  console.log(productData);

  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  function validationForm() {
    let errors = {};
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
      }
      return true;
    }
  }

  const getProductById = (reqData) => {
    getItem(id)
      .then((res) => {
        AllProducts.current[0] = res.data.data[0];
        setProductData(res.data.data);
        if (res.data.data) {
          setUseValidation(res.data.data[0].product_brand_aaray[0]);
          setModelValidation(res.data.data[0].product_model_aaray[0]);
        }
        setCheckURL(res.data.data[0].image);

        setSelectBrand(
          reqData.brandData.filter((e) =>
            e.segment_array.includes(res.data.data[0].product_segment_aaray[0])
          )
        );
        setSelectModel(
          reqData.modelData.filter((e) =>
            e.model_brand_array.includes(
              res.data.data[0].product_brand_aaray[0]
            )
          )
        );
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const promises = [];
    setLoader(true);
    if (newImgURL.length !== 0 || files.length !== 0) {
      if (newImgURL.length !== 0) {
        newImgURL.map((item) => {
          const storage = getStorage();
          const desertRef = ref(storage, item);
          deleteObject(desertRef)
            .then(() => {
              console.log("image deleted");
            })
            .catch((err) => {});
        });
        if (files.length !== 0) {
          files.map((item2) => {
            const storageRef = ref(
              storage,
              `image${Math.random()}${item2.name}`
            );
            const uploadTask = uploadBytesResumable(storageRef, item2);
            promises.push(uploadTask);
          });
          if (files.length === promises.length) {
            Promise.all(promises)
              .then((res) => {
                let urls = [];
                res.map((res2, index) => {
                  getDownloadURL(res2.ref).then((url) => {
                    urls.push(url);
                    if (index == files.length - 1) {
                      setTimeout(() => {
                        AllProducts.current[0].image = [...urls, ...checkURL];

                        editItem(id, AllProducts.current[0])
                          .then((res) => {
                            sessionStorage.setItem("updated", "true");
                            navigate("/product");
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }, 1000);
                    }
                  });
                });
              })
              .catch((err) => console.log(err));
          }
        } else {
          AllProducts.current[0].image = checkURL;
          editItem(id, AllProducts.current[0])
            .then((res) => {
              sessionStorage.setItem("updated", "true");
              navigate("/product");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        if (files.length !== 0) {
          files.map((item2) => {
            const storageRef = ref(
              storage,
              `image${Math.random()}${item2.name}`
            );
            const uploadTask = uploadBytesResumable(storageRef, item2);
            promises.push(uploadTask);
          });
          if (files.length === promises.length) {
            Promise.all(promises)
              .then((res) => {
                let urls = [];
                res.map((res2, index) => {
                  getDownloadURL(res2.ref).then((url) => {
                    urls.push(url);
                    if (index == files.length - 1) {
                      setTimeout(() => {
                        AllProducts.current[0].image = [...urls, ...checkURL];

                        editItem(id, AllProducts.current[0])
                          .then((res) => {
                            sessionStorage.setItem("updated", "true");
                            navigate("/product");
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }, 1000);
                    }
                  });
                });
              })
              .catch((err) => console.log(err));
          }
        } else {
          AllProducts.current[0].image = checkURL;
          editItem(id, AllProducts.current[0])
            .then((res) => {
              sessionStorage.setItem("updated", "true");
              navigate("/product");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } else {
      editItem(id, AllProducts.current[0])
        .then((res) => {
          sessionStorage.setItem("updated", "true");
          navigate("/product");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function filterd(fil) {
    let singleSegment = segment.filter((item) => item._id === fil);

    AllProducts.current[0].product_segment_aaray = [fil];
    AllProducts.current[0].segment_name = singleSegment[0].vehicle_name;
    setSelectBrand(brand.filter((e) => e.segment_array.includes(fil)));
    setSelectModel([]);
  }

  function editModelData(e) {
    AllProducts.current[0].product_model_aaray = [e.target.value];

    let modelName = selectModel.filter((item) => item._id === e.target.value);

    AllProducts.current[0].model_name = modelName[0].model_name;
  }

  function filteredModel(fil) {
    if (selectBrand.length === 0) {
      alert("please select brand");
    }
    AllProducts.current[0].product_brand_aaray = [fil];

    let brandName = selectBrand.filter((item) => item._id === fil);

    AllProducts.current[0].brand_name = brandName[0].brand_name;

    setSelectModel(model.filter((e) => e.model_brand_array.includes(fil)));
  }
  useEffect(() => {
    setFiles(uploadimg);
    console.log(uploadimg);
  }, [uploadimg]);

  const imgPrev = (imgs) => {
    console.log(imgs[0].name);
    let num = 0;
    imgs.forEach((res) => {
      if (!res.name.match(/\.(jpg|jpeg|png|svg)$/)) {
        num++;
      }
    });
    if (num === 0) {
      setUploadImg((uploadimg) => [...uploadimg, ...imgs]);
      console.log(uploadimg);
      setFiles(imgs);
      let arr = [];
      imgs.map((item) => {
        let url = URL.createObjectURL(item);
        arr.push(url);
        console.log(url);
      });
      setimgURLs([...imgURLs, ...arr]);
      console.log(imgURLs);
    }
    else {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Please select jpg, jpeg, png, svg images",
        type: "error",
      });
    }
  };

  const ExistNameCheck = (e) => {
    e.preventDefault();
    let valid = validationForm();

    if (valid) {
      if (checkURL.length !== 0 || imgURLs.length !== 0) {
        let arr = allProductData.filter(
          (item) =>
            item.product_name === AllProducts.current[0].product_name &&
            item._id !== AllProducts.current[0]._id
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
          formSubmit(e);
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

  useEffect(() => {
    CallMultipleApi.CallMultipleApi([
      `${apis.getAllData}`,
      `${apis.product.getAll}`,
      `${apis.manufacture.getAll}`,
    ]).then((res) => {
      setSegment(res[0].data.data.segmentData);
      setBrand(res[0].data.data.brandData);
      setModel(res[0].data.data.modelData);
      setCategory(res[1].data.data);
      setManufacturer(res[2].data.data);

      getProductById(res[0].data.data);
    });
    getAllItem()
      .then((res) => setAllProductData(res.data.data))
      .catch((err) => console.log(err));
  }, []);
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
        Edit Product
      </Typography>
      {!loader ? (
        <Box>
          <form onSubmit={ExistNameCheck}>
            {AllProducts.current.map((res, index) => {
              return (
                <Grid container className="d-flex justify-content-center ">
                  <Grid
                    item
                    xl={5}
                    md={6}
                    sm={12}
                    sx={12}
                    className="border pb-3"
                  >
                    <Box>
                      <Grid container mt={2}>
                        <Grid
                          item
                          md={12}
                          sm={12}
                          xs={12}
                          className="px-3 mt-2"
                        >
                          <label>Product Name :</label>
                          <br />
                          <input
                            required
                            type="text"
                            placeholder="Enter Product Name"
                            onChange={(e) => {
                              if (e.target.value == " ") {
                                e.target.value = "";
                              } else {
                                AllProducts.current[
                                  index
                                ].product_name = e.target.value
                                  .trim()
                                  .toLocaleLowerCase();
                              }
                            }}
                            defaultValue={
                              productData ? productData[0].product_name : ""
                            }
                            className="form-control w-100"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          className="px-3 mt-2"
                        >
                          <label>Product Description :</label>
                          <br />
                          <textarea
                            placeholder="Enter Product Description"
                            onChange={(e) => {
                              if (e.target.value == " ") {
                                e.target.value = "";
                              } else {
                                AllProducts.current[
                                  index
                                ].product_description = e.target.value.trim();
                              }
                            }}
                            defaultValue={
                              productData
                                ? productData[0].product_description
                                : ""
                            }
                            className="form-control w-100"
                            rows="3"
                          />
                        </Grid>
                        <Grid
                          item
                          md={12}
                          sm={12}
                          xs={12}
                          className="px-3 mt-2"
                        >
                          <label>OE Reference Number :</label>
                          <br />
                          <input
                            required
                            type="text"
                            placeholder="Enter OE Reference Number"
                            onChange={(e) => {
                              if (e.target.value == " ") {
                                e.target.value = "";
                              } else {
                                AllProducts.current[
                                  index
                                ].oe_reference_number = e.target.value.trim();
                              }
                            }}
                            defaultValue={
                              productData
                                ? productData[0].oe_reference_number
                                : ""
                            }
                            className="form-control w-100"
                          />
                        </Grid>
                        <Grid
                          item
                          md={12}
                          sm={12}
                          xs={12}
                          className="px-3 mt-2"
                        >
                          <label>KE Part Number :</label>
                          <br />
                          <input
                            required
                            type="text"
                            placeholder="Enter KE Part Number"
                            onChange={(e) => {
                              if (e.target.value == " ") {
                                e.target.value = "";
                              } else {
                                AllProducts.current[
                                  index
                                ].ke_partNumber = e.target.value.trim();
                              }
                            }}
                            defaultValue={
                              productData ? productData[0].ke_partNumber : ""
                            }
                            className="form-control w-100"
                          />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Product MRP(₹) :</label>
                          <br />
                          <input
                            required
                            type="number"
                            placeholder="Enter In Rupees"
                            onChange={(e) => {
                              if (e.target.value == " ") {
                                e.target.value = "";
                              } else {
                                AllProducts.current[
                                  index
                                ].MRP = e.target.value.trim();
                              }
                            }}
                            defaultValue={productData ? productData[0].MRP : ""}
                            className="form-control w-100"
                            style={{ height: "50px" }}
                          />
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Select Segment :</label>
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                              Segment
                            </InputLabel>
                            <Select
                              className="select-style1"
                              fullWidth
                              required
                              label="Outlined"
                              variant="outlined"
                              defaultValue={
                                productData
                                  ? productData[0].product_segment_aaray[0]
                                  : ""
                              }
                              onChange={(e) => {
                                filterd(e.target.value);
                                let pro = productData[0];
                                pro.product_brand_aaray = [];
                                pro.brand_name = "";
                                pro.product_model_aaray = [];
                                console.log(pro, "pro");
                                setProductData([pro]);
                                setUseValidation("");
                                setModelValidation("");
                                setSelectedBrand("");
                              }}
                            >
                              {segment.map((item, index) => (
                                <MenuItem key={index} value={item._id}>
                                  {item.vehicle_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Select Brand :</label>
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                              Brand
                            </InputLabel>
                            <Select
                              className="select-style1"
                              fullWidth
                              required
                              label="Outlined"
                              variant="outlined"
                              value={selectedBrand}
                              defaultValue={
                                productData
                                  ? productData[0].product_brand_aaray[0]
                                  : ""
                              }
                              onChange={(e) => {
                                setSelectedBrand(e.target.value);
                                filteredModel(e.target.value);
                                let pro = productData[0];
                                pro.product_model_aaray = "";
                                setProductData([pro]);
                                setModelValidation("");
                                setUseValidation(e.target.value);
                                setBrandError({});
                              }}
                            >
                              {selectBrand.map((item, index) => (
                                <MenuItem key={index} value={item._id}>
                                  {item.brand_name}
                                </MenuItem>
                              ))}
                            </Select>
                            {brandError.useValidation ? (
                              <p style={{ color: "red" }}>
                                {brandError.useValidation}
                              </p>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Select Model :</label>
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                              Model
                            </InputLabel>
                            <Select
                              className="select-style1"
                              fullWidth
                              required
                              defaultValue={
                                productData
                                  ? productData[0].product_model_aaray[0]
                                  : ""
                              }
                              onChange={(e) => {
                                editModelData(e);
                                setModelValidation(e.target.value);
                                setBrandError({});
                              }}
                              label="Outlined"
                              variant="outlined"
                            >
                              {selectModel.map((item, index) => (
                                <MenuItem key={index} value={item._id}>
                                  {item.model_name}
                                </MenuItem>
                              ))}
                            </Select>
                            {brandError.modelValidation ? (
                              <p style={{ color: "red" }}>
                                {brandError.modelValidation}
                              </p>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Select Category :</label>
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                              Category
                            </InputLabel>
                            <Select
                              className="select-style1"
                              fullWidth
                              required
                              label="Outlined"
                              variant="outlined"
                              defaultValue={
                                productData
                                  ? productData[0].product_category_aaray[0]
                                  : ""
                              }
                              onChange={(e) =>
                                (AllProducts.current[0].product_category_aaray = [
                                  e.target.value,
                                ])
                              }
                            >
                              {category.map((item, index) => (
                                <MenuItem key={index} value={item._id}>
                                  {item.category_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                          <label>Select Manufacturer :</label>
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">
                              Manufacturer
                            </InputLabel>
                            <Select
                              className="select-style1"
                              fullWidth
                              required
                              label="Outlined"
                              variant="outlined"
                              defaultValue={
                                productData
                                  ? productData[0].product_manufacture_aaray[0]
                                  : ""
                              }
                              onChange={(e) =>
                                (AllProducts.current[0].product_manufacture_aaray = [
                                  e.target.value,
                                ])
                              }
                            >
                              {manufacturer.map((res, index) => {
                                return (
                                  <MenuItem value={res._id}>
                                    {res.manufacturer_name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          md={12}
                          lg={12}
                          sm={12}
                          sx={12}
                          className="px-3 mt-2"
                        >
                          <label>Add Product Images :</label>
                          <br />

                          <div className="w-100 d-flex flex-wrap">
                            {checkURL.map((item, index) => (
                              <div
                                key={index}
                                className=" mb-1 pe-1 relative"
                                style={{ width: "25%" }}
                              >
                                <CancelIcon
                                  sx={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                  onClick={() => {
                                    let arr = [...checkURL];
                                    let del = arr.splice(index, 1);
                                    setCheckURL(arr);
                                    setNewImgURL(del);
                                  }}
                                  className="close-btn-position"
                                />
                                <img className="img-style" src={item} />
                              </div>
                            ))}
                            {imgURLs.map((item, index) => (
                              <div
                                key={index}
                                className=" mb-1 pe-1 relative box_style border"
                              >
                                <CancelIcon
                                  sx={{
                                    fontSize: "12px",
                                    color: "red",
                                  }}
                                  onClick={() => {
                                    let arr = [...imgURLs];
                                    arr.splice(index, 1);
                                    setimgURLs(arr);
                                  }}
                                  className="close-btn-position"
                                />
                                <img className="img-style" src={item} />
                              </div>
                            ))}
                            <div className="box_style img-btn">
                              <div className="btn w-100">
                                <input
                                  type="file"
                                  multiple
                                  id="2actual-btn"
                                  hidden
                                  onChange={(e) =>
                                    imgPrev(Object.values(e.target.files))
                                  }
                                />
                                <label
                                  className="text-center text-gray"
                                  htmlFor="2actual-btn"
                                >
                                  <CloudUploadIcon />
                                  <br />
                                  <span>Upload</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid>
                      <Grid
                        item
                        xl={12}
                        // md={9}
                        // sm={12}
                        // sx={12}
                        // sx={{ border: "2px solid red", width: "100%" }}
                      >
                        <Box align="right" mt={6}>
                          <Button
                            className="cancel_btn me-3"
                            onClick={() => navigate("/product")}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="custom-btn"
                            variant="contained"
                            sx={{ marginRight: "10px" }}
                          >
                            Update
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </form>
        </Box>
      ) : null}
    </>
  );
}
