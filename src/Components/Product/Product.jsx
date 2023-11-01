import {
  Backdrop,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { apis } from "../../auth/api";
import { CallMultipleApi } from "../../services/CallMultipleApi";
import { Triangle } from "react-loader-spinner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";
import "./Style.css";

export default function Product({
  AllProducts,
  index,
  productData,
  files,
  setFiles,
  setModelValidation,
  setUseValidation,
  brandError,
  useValidation,
  setBrandError,
  ShowSnackbar,
}) {
  const [loader, setLoader] = useState(true);
  const [segment, setSegment] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectModel, setSelectModel] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");

  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [aa, setAa] = useState([]);
  const [imgURLs, setimgURLs] = useState([]);
  const [segId, setSegId] = useState("");
  //  const [snackbar, ShowSnackbar] = useState({
  //    show: false,
  //    vertical: "top",
  //    horizontal: "right",
  //    msg: "data added",
  //    type: "error",
  //  });

  const navigate = useNavigate();
  console.log(segment);
  console.log(selectBrand);
  console.log(selectModel);

  function filterd(fil) {
    setSelectBrand([]);
    setSegId(fil);
    AllProducts.current[0].product_brand_aaray = [];
    AllProducts.current[0].brand_name = "";
    console.log(AllProducts.current[0]);
    let singleSegment = segment.filter((item) => item._id === fil);
    AllProducts.current[index].product_segment_aaray = [fil];
    AllProducts.current[index].segment_name = singleSegment[0].vehicle_name;
    setSelectBrand(brand.filter((e) => e.segment_array.includes(fil)));
    setSelectModel([]);
  }

  function addModelData(e) {
    AllProducts.current[index].product_model_aaray = [e.target.value];

    let modelName = selectModel.filter((item) => item._id === e.target.value);

    AllProducts.current[index].model_name = modelName[0].model_name;
  }

  function filteredModel(fil) {
    setSelectModel([]);
    AllProducts.current[index].product_brand_aaray = [fil];
    let brandName = selectBrand.filter((item) => item._id === fil);

    AllProducts.current[index].brand_name = brandName[0].brand_name;

    setSelectModel(
      model.filter(
        (e) =>
          e.model_brand_array.includes(fil) &&
          e.model_segment_array.includes(segId)
      )
    );
  }

  const imgPrev = (imgs) => {
    console.log(imgs);
    let num = 0;

    imgs.forEach((res) => {
      console.log(res.name);
      if (!res.name.match(/\.(jpg|jpeg|png|svg)$/)) {
        num++;
      }
    });
    if (num == 0) {
      setAa((aa) => [...aa, ...imgs]);

      let arr = [];

      imgs.map((item) => {
        let url = URL.createObjectURL(item);
        console.log(url.name);
        arr.push(url);
      });
      setimgURLs([...imgURLs, ...arr]);
    } else {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Please select jpg, jpeg, png, svg images",
        type: "error",
      });
    }
  };

  useEffect(() => {
    setFiles(aa);
    console.log(aa.name);
  }, [aa]);
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

      setLoader(false);
    });
  }, []);
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
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
      {!loader ? (
        <Grid container className="d-flex justify-content-center ">
          <Grid item xl={5} md={6} sm={12} sx={12} className="border pb-3">
            <Box>
              <Grid container mt={2}>
                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
                  <label> Part Name :</label>
                  <br />
                  <input
                    required
                    type="text"
                    placeholder="Enter Part Name"
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
                <Grid item xs={12} sm={12} md={12} className="px-3 mt-2">
                  <label>Description :</label>
                  <br />
                  <textarea
                    placeholder="Enter Description"
                    required
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
                      productData ? productData[0].product_description : ""
                    }
                    className="form-control w-100"
                    rows="3"
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
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
                      productData ? productData[0].oe_reference_number : ""
                    }
                    className="form-control w-100"
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
                  <label>Part Number :</label>
                  <br />
                  <input
                    required
                    type="text"
                    placeholder="Enter Part Number"
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
                  <label>Part MRP(₹) :</label>
                  <br />
                  <input
                    id="number2"
                    required
                    type="number"
                    placeholder="Enter In Rupees"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        AllProducts.current[index].MRP = e.target.value.trim();
                      }
                    }}
                    defaultValue={productData ? productData[0].MRP : ""}
                    className="form-control w-100 "
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
                      defaultValue={
                        productData
                          ? productData[0].product_segment_aaray[0]
                          : ""
                      }
                      onChange={(e) => {
                        setSelectedBrand("");
                        filterd(e.target.value);
                        setUseValidation("");
                      }}
                      label="Outlined"
                      variant="outlined"
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
                    <InputLabel id="demo-multiple-name-label">Brand</InputLabel>
                    <Select
                      className="select-style1"
                      fullWidth
                      value={selectedBrand}
                      //  required
                      defaultValue={
                        productData ? productData[0].product_brand_aaray[0] : ""
                      }
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        filteredModel(e.target.value);
                        setModelValidation("");
                        setUseValidation(e.target.value);
                        setBrandError({});
                      }}
                      input={<OutlinedInput label="Name" />}
                    >
                      {/* <MenuItem value="">Select Brand</MenuItem> */}
                      {selectBrand.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.brand_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {brandError.useValidation ? (
                      <p style={{ color: "red" }}>{brandError.useValidation}</p>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                  <label>Select Model :</label>
                  <br />
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">Model</InputLabel>
                    <Select
                      className="select-style1"
                      fullWidth
                      //  required
                      defaultValue={
                        productData ? productData[0].product_model_aaray[0] : ""
                      }
                      onChange={(e) => {
                        addModelData(e);
                        setModelValidation(e.target.value);
                        setBrandError({});
                      }}
                      input={<OutlinedInput label="Name" />}
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
                      defaultValue={
                        productData
                          ? productData[0].product_category_aaray[0]
                          : ""
                      }
                      onChange={(e) =>
                        (AllProducts.current[index].product_category_aaray = [
                          e.target.value,
                        ])
                      }
                      label="Outlined"
                      variant="outlined"
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
                      defaultValue={
                        productData
                          ? productData[0].product_manufacture_aaray[0]
                          : ""
                      }
                      onChange={(e) =>
                        (AllProducts.current[
                          index
                        ].product_manufacture_aaray = [e.target.value])
                      }
                      label="Outlined"
                      variant="outlined"
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
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                  <label> Cash on delivery :</label>
                  <br />
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Cash on delivery
                    </InputLabel>
                    <Select
                      className="select-style1"
                      fullWidth
                      required
                      defaultValue={
                        productData
                          ? productData[0].cash_on_delivery
                          : ""
                      }
                      onChange={(e) =>{
                        console.log(e.target.value,"valuesssss")
                        AllProducts.current[
                          index
                        ].cash_on_delivery = e.target.value
                      }}
                      label="Outlined"
                      variant="outlined"
                    >
                     
                          <MenuItem value={"yes"}>
                            Yes
                          </MenuItem>
                          <MenuItem value={"no"}>
                            No
                          </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid
                  item
                  md={12}
                  lg={12}
                  sm={12}
                  sx={12}
                  className="px-3 mt-2"
                >
                  <label>Upload Excel File :</label>
                  <br />
                  <input className="form-control" type="file" />
                </Grid> */}

                <Grid
                  item
                  md={12}
                  lg={12}
                  sm={12}
                  sx={12}
                  className="px-3 mt-2"
                >
                  <label>Add Part Images :</label>
                  <br />
                  {/* <button htmlFor="2actual-btn" type="button"> */}
                  <div className="w-100 d-flex flex-wrap">
                    {imgURLs.map((item, index) => (
                      <div
                        key={index}
                        className=" mb-1 pe-1 relative box_style border"
                      >
                        <CancelIcon
                          sx={{ fontSize: "12px", color: "red" }}
                          onClick={() => {
                            let arr = [...imgURLs];
                            let fileArr = [...files];
                            fileArr.splice(index, 1);
                            arr.splice(index, 1);
                            setimgURLs(arr);
                            setFiles(fileArr);
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
                          type="button"
                        >
                          <CloudUploadIcon />
                          <br />
                          <span>Upload</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* </button> */}
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid
                item
                // xl={7}
                // md={6}
                // sm={12}
                // sx={}
                sx={{ width: "100%" }}
              >
                <Box
                  align="right"
                  mt={6}
                  // sx={{ display: "flrx", justifyContent: "end" }}
                >
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
                    onClick={() => console.log(brandError)}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}
