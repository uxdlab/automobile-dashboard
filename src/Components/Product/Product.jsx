import { Backdrop, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apis } from "../../auth/api";
import { CallMultipleApi } from "../../services/CallMultipleApi";
import { Triangle } from "react-loader-spinner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";

export default function Product({
  AllProducts,
  index,
  productData,
  files,
  setFiles,
}) {
  const [loader, setLoader] = useState(true);
  const [segment, setSegment] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [selectModel, setSelectModel] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);

  const [imgURLs, setimgURLs] = useState([]);
   const navigate = useNavigate();

  function filterd(fil) {
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
    AllProducts.current[index].product_brand_aaray = [fil];
    let brandName = selectBrand.filter((item) => item._id === fil);

    AllProducts.current[index].brand_name = brandName[0].brand_name;

    setSelectModel(model.filter((e) => e.model_brand_array.includes(fil)));
  }

  const imgPrev = (imgs) => {
    setFiles(imgs);

    let arr = [];
    imgs.map((item) => {
      let url = URL.createObjectURL(item);
      arr.push(url);
    });
    setimgURLs([...imgURLs, ...arr]);
     console.log(imgURLs);
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

      setLoader(false);
    });
  }, []);
  return (
    <>
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
      {!loader ? (
        <Grid container className="d-flex justify-content-center ">
          <Grid item xl={5} md={6} sm={12} sx={12} className="border pb-3">
            <Box>
              <Grid container mt={2}>
                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
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
                <Grid item xs={12} sm={12} md={12} className="px-3 mt-2">
                  <label>Product Description :</label>
                  <br />
                  <textarea
                    placeholder="Enter Product Description"
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
                        AllProducts.current[index].MRP = e.target.value.trim();
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
                      defaultValue={
                        productData
                          ? productData[0].product_segment_aaray[0]
                          : ""
                      }
                      onChange={(e) => filterd(e.target.value)}
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
                      required
                      defaultValue={
                        productData ? productData[0].product_brand_aaray[0] : ""
                      }
                      onChange={(e) => filteredModel(e.target.value)}
                      input={<OutlinedInput label="Name" />}
                    >
                      {selectBrand.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.brand_name}
                        </MenuItem>
                      ))}
                    </Select>
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
                      required
                      defaultValue={
                        productData ? productData[0].product_model_aaray[0] : ""
                      }
                      onChange={addModelData}
                      input={<OutlinedInput label="Name" />}
                    >
                      {selectModel.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.model_name}
                        </MenuItem>
                      ))}
                    </Select>
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
                  <label>Add Product Images :</label>
                  <br />

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
                        >
                          <CloudUploadIcon />
                          <br />
                          <span>Upload</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xl={5} md={6} sm={12} sx={12}>
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
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}
