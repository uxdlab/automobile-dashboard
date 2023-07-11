import React, { useEffect, useRef, useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import "rc-pagination/assets/index.css";
import { ModelClass } from "../../services/Model";
import { Delete, Edit } from "@mui/icons-material";
import { Triangle } from "react-loader-spinner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { VehicleClass } from "../../services/Vehicle";
import { SnackBar } from "../Assets/SnackBar";

export const ModelListing = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loader, setLoader] = useState(true);
  const [selectSegment, setSelectSegment] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [seleBrand, setSeleBrand] = useState([]);

  const [allData, setData] = useState([]);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  const [deleteModel, setDeleteModel] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [deleteMod, setDeletedMod] = useState({ id: "", index: "", icon: "" });
  const [allSegment, setSegment] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [brandError, setBrandError] = useState("");
  const [modelValidation, setModelValidation] = useState("");
  const [useValidation, setUseValidation] = useState();
  const [allProductC, setAllProductc] = useState([]);
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [localImg, setLocalImg] = useState();

  const [img, setImg] = useState({});

  const [imgURL, setImgURL] = useState("");
  const [id, setId] = useState("");
  let modelData = useRef({
    model_name: "",
    model_description: "",
    model_segment_array: [],
    model_brand_array: [],
    model_icon: "",
  });

  const [collection, setCollection] = React.useState([]);
  function validationForm() {
    let errors = {};
    console.log(seleBrand);
    if (seleBrand.length === 0) {
      // alert("please select brand");
      errors.useValidation = "Please select brand";
      setBrandError({ useValidation: "Please select brand" });
      return false;
    } else {
      // if (modelValidation.length === 0) {
      //   // alert("please select modal");
      //   setBrandError({ modelValidation: "Please select model" });

      //   return false;
      // }

      return true;
    }
  }
  function handleSearchClick(search) {
    if (search.length === 0) {
      setCollection(allData.slice(0, countPerPage));
    }
    if (search.trim().length !== 0) {
      let filterBySearch = allProductC.filter((item) => {
        //  console.log(item.brand[0].brand_name.includes(search.trim().toLocaleLowerCase());
        let result;
        console.log(item);
        if (item.brand.length !== 0 && item.segment.length !== 0) {
          if (
            item.model_name.includes(search.trim().toLocaleLowerCase()) ||
            item.brand[0].brand_name.includes(
              search.trim().toLocaleLowerCase()
            ) ||
            item.segment[0].vehicle_name.includes(
              search.trim().toLocaleLowerCase()
            )
          ) {
            result = true;
          } else {
            result = false;
          }
          return result;
        }
        // return item.model_name.includes(search.trim().toLocaleLowerCase());
      });
      setCollection(filterBySearch);
      setData(filterBySearch);
    } else {
      setData(allProductC);
    }
  }

  useEffect(() => {
    getAllModels();
    getSegmentBrand();
  }, []);
  function getAllModels() {
    setLoader(true);
    ModelClass.getAllModel()
      .then((res) => {
        setData(res.data.data);
        setAllProductc(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allData]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allData.slice(from, to));
  };

  function deleteModelf() {
    setDeleteModel(false);
    setLoader(true);
    if (deleteMod.icon !== "") {
      const storage = getStorage();
      const desertRef = ref(storage, deleteMod.icon);
      deleteObject(desertRef)
        .then(() => {
          ModelClass.deleteModel(deleteMod.id)
            .then((res) => {
              getAllModels();
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Model Deleted successfully",
                type: "success",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {});
    } else {
      ModelClass.deleteModel(deleteMod.id)
        .then((res) => {
          getAllModels();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Model Deleted successfully",
            type: "success",
          });
        })
        .catch((err) => console.log(err));
    }
    setSelectSegment([]);
    setSelectBrand([]);
  }

  async function addModel(e) {
    e.preventDefault();

    setLoader(true);
    modelData.current.model_segment_array = selectSegment;
    modelData.current.model_brand_array = seleBrand;
    setOpen(false);
    const storageRef = ref(storage, `${Math.random()}${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          modelData.current.model_icon = url;

          ModelClass.addModel(modelData.current)
            .then((res) => {
              setLoader(false);
              getAllModels();
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Model Added successfully",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
              setLoader(false);
              getAllModels();
            });
        });
      }
    );
    setLocalImg("");
    setImg({});
    modelData.current.model_icon = "";
    setSelectSegment([]);
    setSelectBrand([]);
  }

  async function updateModel(e) {
    e.preventDefault();
    setLoader(true);
    setOpen1(false);

    modelData.current.model_segment_array = selectSegment;
    modelData.current.model_brand_array = seleBrand;
    if (img.name !== undefined) {
      if (modelData.current.model_icon !== "") {
        const storage = getStorage();
        const desertRef = ref(storage, imgURL);
        deleteObject(desertRef)
          .then(() => {
            const storageRef = ref(storage, img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (err) => console.log(err),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  modelData.current.model_icon = url;

                  ModelClass.editModel(id, modelData.current)
                    .then((res) => {
                      setLoader(false);
                      getAllModels();
                      ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Model Updated successfully",
                        type: "success",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoader(false);
                      setLoader(false);
                    });
                });
              }
            );
          })
          .catch((error) => {});
      } else {
        const storageRef = ref(storage, img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              modelData.current.model_icon = url;
              ModelClass.editModel(id, modelData.current)
                .then((res) => {
                  getAllModels();
                  setLoader(false);
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Model Updated successfully",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setLoader(false);
                  setLoader(false);
                });
            });
          }
        );
      }
    } else {
      ModelClass.editModel(id, modelData.current)
        .then((res) => {
          setLoader(false);
          getAllModels();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Model Updated successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setLoader(false);
        });
    }
    setLocalImg("");
    setImg({});
    setSelectSegment([]);
    setSelectBrand([]);
  }

  async function getModelById(idd, icon) {
    setLoader(true);
    setImgURL(icon);
    setId(idd);
    ModelClass.getModel(idd)
      .then((res) => {
        modelData.current = res.data.data[0];
        if (modelData.current.model_icon) {
          setLocalImg(modelData.current.model_icon);
        }

        setSelectSegment(modelData.current.model_segment_array);
        setSeleBrand(modelData.current.model_brand_array);
        let arr = modelData.current.model_segment_array[0];
        setSelectBrand(allBrand.filter((e) => e.segment_array.includes(arr)));
        setLoader(false);
        setOpen1(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }

  async function getSegmentBrand() {
    VehicleClass.getSegmentBrandModel()
      .then((res) => {
        setSegment(res.data.data.segmentData);
        setAllBrand(res.data.data.brandData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const imgPrev = (imgs) => {
    if (imgs.name.match(/\.(jpg|jpeg|png|svg)$/)) {
      if (imgs.name !== undefined) {
        let url = URL.createObjectURL(imgs);
        setLocalImg(url);
        console.log(url);
      } else {
        setLocalImg(undefined);
      }
    } else {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Please select jpg, jpeg, png, svg image",
        type: "error",
      });
    }
  };

  function filterd(fil) {
    setSelectSegment([fil]);
    setSelectBrand(allBrand.filter((e) => e.segment_array.includes(fil)));
  }

  const ExistNameCheck = (e) => {
    e.preventDefault();
    let valid = validationForm();
    if (valid) {
      if (img.name !== undefined) {
        let arr = allData.filter(
          (item) => item.model_name === modelData.current.model_name
        );
        if (arr.length !== 0) {
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Model Already Exist",
            type: "error",
          });
        } else {
          addModel(e);
        }
      } else {
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Please Upload Icon",
          type: "error",
        });
      }
    }
  };

  const checkNameForUpdate = (e) => {
    e.preventDefault();
    let valid = validationForm();
    let arr = allData.filter(
      (item) =>
        item.model_name === modelData.current.model_name &&
        item._id !== modelData.current._id
    );
    if (valid) {
      if (arr.length !== 0) {
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Model Already Exist",
          type: "error",
        });
      } else {
        updateModel(e);
      }
    }
  };

  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <h1 className="mt-2 fs-2 mx-3">Model</h1>
      <Box className="pb-3 d-flex justify-content-between">
        <Grid container>
          <Grid item md={6} xs={12} style={{ marginLeft: "18px" }}>
            <input
              className="w-75 form-control"
              type="search"
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
                handleSearchClick(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
            className="d-flex justify-content-end"
            style={{ marginLeft: "48px" }}
          >
            <Button
              className="btn_primary"
              onClick={() => setOpen(true)}
              variant="contained"
            >
              Add Model
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <Box align="right" className="px-3 pb-3">
          <Button
            className="btn_primary"
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Add Model
          </Button>
        </Box> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <Dialog open={deleteModel} maxWidth={"sm"} fullWidth={true}>
          <Box p={3}>
            <Box>Are you sure you want to delete?</Box>
            <Box align="right">
              <Button
                className="cancel_btn me-3"
                onClick={() => setDeleteModel(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="custom-btn"
                onClick={deleteModelf}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Dialog>
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

      {/* Add Model Dialog Box */}
      <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Add New Model</h5>
          <hr />
          <form onSubmit={ExistNameCheck}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Select Segment:
                      </b>
                    </small>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Segment
                    </InputLabel>

                    <Select
                      className="select-style1"
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      fullWidth
                      required
                      onChange={(e) => {
                        filterd(e.target.value);
                        setSeleBrand([]);
                      }}
                      input={<OutlinedInput label="Name" />}
                    >
                      {allSegment.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.vehicle_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-6 col-sm-16 col-6">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Select Brand:
                      </b>
                    </small>
                  </div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">Brand</InputLabel>
                    <Select
                      fullWidth
                      className="select-style1"
                      // value={seleBrand}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setBrandError({});
                        setSeleBrand([e.target.value]);
                        // e.target.value = "";
                        setModelValidation("");
                        // setUseValidation(e.target.value);
                      }}
                      input={<OutlinedInput label="Name" />}
                    >
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
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Model Name:
                      </b>
                    </small>
                  </div>
                  <input
                    type="text"
                    required
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        modelData.current.model_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    placeholder="Enter Model Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Model Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        modelData.current.model_description = e.target.value;
                      }
                    }}
                    rows="3"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Add Model Icon:
                      </b>
                    </small>
                  </div>
                  <div className="d-flex">
                    {localImg ? (
                      <div className="box_style border me-1 relative">
                        <CloseIcon
                          onClick={() => {
                            setLocalImg("");
                            setImg({});
                          }}
                          className="close-btn-position"
                        />
                        <img className="img-style" src={localImg} />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="box_style img-btn">
                      <div className="btn w-100">
                        <input
                          type="file"
                          id="2actual-btn"
                          hidden
                          onChange={(e) => {
                            setImg(e.target.files[0]);
                            imgPrev(e.target.files[0]);
                            e.target.value = "";
                          }}
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
                </div>
                <Box align="right" className="mt-3">
                  <span
                    className="btn cancel_btn me-3 py-1 px-3"
                    onClick={() => {
                      setOpen(false);
                      setLocalImg("");
                      setBrandError({});
                    }}
                  >
                    Cancel
                  </span>
                  <button className="btn custom-btn py-1 px-3" type="submit">
                    Add
                  </button>
                </Box>
              </div>
            </div>
          </form>
        </Box>
      </Dialog>

      {/* Edit Brand Dialog Box */}
      <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Edit Model</h5>
          <hr />
          <form onSubmit={checkNameForUpdate}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Select Segment:
                      </b>
                    </small>
                  </div>
                  <Select
                    required
                    className="select-style"
                    fullWidth
                    defaultValue={selectSegment[0]}
                    onChange={(e) => {
                      filterd(e.target.value);
                      setSeleBrand([]);
                    }}
                  >
                    {allSegment.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.vehicle_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col-md-6">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Select Brand:
                      </b>
                    </small>
                  </div>
                  <Select
                    // required
                    className="select-style"
                    fullWidth
                    defaultValue={seleBrand[0]}
                    onChange={(e) => {
                      setSeleBrand([e.target.value]);
                      setBrandError({});
                      setSeleBrand([e.target.value]);
                      // e.target.value = "";
                      setModelValidation("");
                    }}
                  >
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
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Model Name:
                      </b>
                    </small>
                  </div>
                  <input
                    type="text"
                    required
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        modelData.current.model_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    defaultValue={
                      modelData.current ? modelData.current.model_name : ""
                    }
                    placeholder="Enter Model Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Model Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    defaultValue={
                      modelData.current
                        ? modelData.current.model_description
                        : ""
                    }
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        modelData.current.model_description = e.target.value;
                      }
                    }}
                    rows="3"
                    placeholder="Enter Description"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Update Model Icon:
                      </b>
                    </small>
                  </div>
                  <div className="d-flex">
                    {localImg ? (
                      <div className="box_style border me-1 relative">
                        <CloseIcon
                          onClick={() => {
                            setLocalImg("");
                            setImg({});
                          }}
                          className="close-btn-position"
                        />
                        <img className="img-style" src={localImg} />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="box_style img-btn">
                      <div className="btn w-100">
                        <input
                          type="file"
                          id="2actual-btn"
                          hidden
                          onChange={(e) => {
                            setImg(e.target.files[0]);
                            imgPrev(e.target.files[0]);
                            e.target.value = "";
                          }}
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
                </div>
                <Box align="right" className="mt-3">
                  <span
                    className="btn cancel_btn me-3 py-1 px-3"
                    onClick={() => {
                      setOpen1(false);
                      setLocalImg("");
                      setBrandError({});
                    }}
                  >
                    Cancel
                  </span>
                  <button className="btn custom-btn py-1 px-3" type="submit">
                    Update
                  </button>
                </Box>
              </div>
            </div>
          </form>
        </Box>
      </Dialog>

      {!loader ? (
        <Box sx={{ mx: 2 }} className="border">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="w-25">
                  <b>&nbsp;</b>
                </TableCell>
                <TableCell className="text-center">
                  {/* <b>Model</b> */} <b>Segment</b>
                </TableCell>
                <TableCell className="text-center">
                  {/* <b>Segment</b> */} <b>Brand</b>
                </TableCell>
                <TableCell className="text-center">
                  {/* <b>Brand</b> */}
                  <b>Model</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection.map((res, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="ps-md-5">
                      <img
                        className="w-12"
                        src={
                          res.model_icon ? res.model_icon : "images/noImage.png"
                        }
                      />
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {/* {res.model_name} */} {res?.segment[0]?.vehicle_name}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {/* {res?.segment[0]?.vehicle_name} */}{" "}
                      {res?.brand[0]?.brand_name}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {/* {res?.brand[0]?.brand_name} */}
                      {res.model_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        className="pointer"
                        onClick={() => {
                          setDeletedMod({
                            id: res._id,
                            index,
                            icon: res.model_icon,
                          });
                          setDeleteModel(true);
                        }}
                      />
                      &nbsp;&nbsp;
                      <Edit
                        className="pointer"
                        onClick={() => getModelById(res._id, res.model_icon)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box sx={{ m: 1 }} className="d-flex justify-content-end">
            <select
              className="me-2"
              onChange={(e) => setCountPerPage(e.target.value * 1)}
            >
              {/* <option>5</option> */}
              <option>10</option>
              <option>15</option>
            </select>
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={allData.length}
              style={{ color: "green" }}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
};
