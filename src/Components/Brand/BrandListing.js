import {
  Backdrop,
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Triangle } from "react-loader-spinner";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit } from "@mui/icons-material";
import { VehicleClass } from "../../services/Vehicle";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../auth/Firebase";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { SnackBar } from "../Assets/SnackBar";
import Pagination from "rc-pagination";

export const BrandListing = () => {
  const theme = useTheme();
  const [allData, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [allCompanies, setCompanies] = useState([]);
  const [allSegment, setSegment] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedComp, setDeletedComp] = useState({
    id: "",
    index: "",
    icon: "",
  });
  const [selectSegment, setSelectSegment] = useState([]);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
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
  let brandData = useRef({
    brand_name: "",
    brand_description: "",
    segment_array: [],
    brand_image: "",
  });
  // brandData.current.segment_array = selectSegment
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  const [allProductC, setAllProductc] = useState([]);
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = useState("");


  function handleSearchClick(search) {
    if (search.length === 0) {
      setCollection(allCompanies.slice(0, countPerPage));
    }
     if (search.trim().length !== 0){
       const filterBySearch = allCompanies.filter((item) => {
        let result;
        if (item.brand_name.includes(search.trim().toLocaleLowerCase())){
          result = true;
        }else{
          result = false;
        } 
       return result;
       });
       setCollection(filterBySearch);
       setCompanies(filterBySearch);
     }else{
      setCompanies(allProductC);
     }
   
    // setCollection(filterBySearch);

    // if(searchValue ===""){
    //     setCollection(allCompanies);
    // }else{
    //     const filterBySearch = collection.filter((item)=>{
    //         return item.brand_name.includes(name.trim().toLocaleLowerCase());
    //     })
    //     setCollection(filterBySearch)
    // }
  }

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allCompanies]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allCompanies.slice(from, to));
  };

  useEffect(() => {
    getAllCompany();
    getAllSegment();
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, selectSegment, theme) {
    return {
      fontWeight:
        selectSegment.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSegment(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getAllCompany() {
    CompanyClass.getAllCompany().then((res) => {
      setLoader(false);
      setCompanies(res.data.data);
      setAllProductc(res.data.data);
    });
  }
  function deleteCompany() {
    setDeleteModel(false);
    setLoader(true);
    console.log(deletedComp);
    if (deletedComp.icon !== "") {
      const storage = getStorage();
      const desertRef = ref(storage, deletedComp.icon);
      deleteObject(desertRef)
        .then(() => {
          console.log("image deleted");
          CompanyClass.deleteCompany(deletedComp.id)
            .then((res) => {
              let arr = [...allCompanies];
              arr.splice(deletedComp.index, 1);
              setCompanies(arr);
              setLoader(false);
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Brand Deleted successfully",
                type: "success",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {});
    } else {
      CompanyClass.deleteCompany(deletedComp.id)
        .then((res) => {
          let arr = [...allCompanies];
          arr.splice(deletedComp.index, 1);
          setCompanies(arr);
          setLoader(false);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Brand Deleted successfully",
            type: "success",
          });
        })
        .catch((err) => console.log(err));
    }
    setSelectSegment([]);
  }

  async function addBrand(e) {
    e.preventDefault();
    console.log(brandData.current);
    setLoader(true);
    brandData.current.segment_array = selectSegment;
    setOpen(false);
    const storageRef = ref(storage, `${Math.random()}${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          brandData.current.brand_image = url;
          console.log(brandData.current);

          CompanyClass.addCompany(brandData.current)
            .then((res) => {
              console.log(res);
              getAllCompany();
              setLoader(false);
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Brand Added successfully",
                type: "success",
              });
            })
            .catch((err) => {
            console.log(err);
            setLoader(false);
            getAllCompany();
            });
        });
      }
    );
    setLocalImg("");
    setImg({});
    brandData.current.brand_image = "";
    setSelectSegment([]);
  }

  async function updateBrand(e) {
    e.preventDefault();
    setLoader(true);
    setOpen1(false);
    console.log(imgURL);
    brandData.current.segment_array = selectSegment;
    if (img.name !== undefined) {
      if (brandData.current.brand_image !== "") {
        const storage = getStorage();
        const desertRef = ref(storage, imgURL);
        deleteObject(desertRef)
          .then(() => {
            console.log("image deleted");
            const storageRef = ref(storage, `${Math.random()}${img.name}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (err) => console.log(err),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url);
                  brandData.current.brand_image = url;
                  console.log(brandData.current.brand_image);
                  CompanyClass.editCompany(id, brandData.current)
                    .then((res) => {
                      console.log(res);
                      setLoader(false);
                      getAllCompany();
                      ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Brand Updated successfully",
                        type: "success",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoader(false);
                      ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Brand Aleady Exist",
                        type: "error",
                      });
                      setLoader(false);
                    });
                });
              }
            );
          })
          .catch((error) => {});
      } else {
        const storageRef = ref(storage, `${Math.random()}${img.name}`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              brandData.current.brand_image = url;
              CompanyClass.editCompany(id, brandData.current)
                .then((res) => {
                  console.log(res);
                  setLoader(false);
                  getAllCompany();
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Brand Updated successfully",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setLoader(false);
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Brand Aleady Exist",
                    type: "error",
                  });
                  setLoader(false);
                });
            });
          }
        );
      }
    } else {
      CompanyClass.editCompany(id, brandData.current)
        .then((res) => {
          console.log(res);
          setLoader(false);
          getAllCompany();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Brand Updated successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Brand Aleady Exist",
            type: "error",
          });
          setLoader(false);
        });
    }
    setLocalImg("");
    setImg({});
    setSelectSegment([]);
  }

  async function getBrandById(idd, icon) {
    setImgURL(icon);
    setLoader(true);
    setId(idd);
    CompanyClass.getCompany(idd)
      .then((res) => {
        console.log(res);
        brandData.current = res.data.data;
        if (brandData.current.brand_image) {
          console.log(brandData?.current.brand_image);
          setLocalImg(brandData?.current.brand_image);
        }
        setSelectSegment(brandData.current.segment_array);
        setLoader(false);
        setOpen1(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }

  async function getAllSegment() {
    VehicleClass.getAllVehicles()
      .then((res) => {
        console.log(res.data.data);
        setSegment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const imgPrev = (imgs) => {
    console.log("okkkkkkkkkkkkkkkkkkkkkkk");
    console.log(imgs);
    if (imgs.name !== undefined) {
      let url = URL.createObjectURL(imgs);
      setLocalImg(url);
      console.log(url);
    } else {
      setLocalImg(undefined);
    }
  };

  const ExistNameCheck = (e) => {
    e.preventDefault();
    if (img.name !== undefined) {
      let arr = allCompanies.filter(
        (item) =>
          item.brand_name === brandData.current.brand_name
          // allCompanies.filter(
          //   (item) => item.brand_name === brandData.current.brand_name
          // )
      );
      {console.log(arr)}
      if (arr.length !== 0) {
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Brand Already Exist",
          type: "error",
        });
      } else {
        addBrand(e);
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
  };

  const checkNameForUpdate = (e) => {
    e.preventDefault();
    let arr = allCompanies.filter(
      (item) =>
        item.brand_name === brandData.current.brand_name &&
        item._id !== brandData.current._id
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Brand Already Exist",
        type: "error",
      });
    } else {
      updateBrand(e);
    }
  };

  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      {/* Delete Dialog Box */}
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
              onClick={deleteCompany}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>

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

      {/* Add Brand Dialog Box */}
      <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Add New Brand</h5>
          <hr />
          <form onSubmit={ExistNameCheck}>
            <div className="container-fluid">
              <div className="row">
                <div>
                  {/* <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span>Select Segment:
                        </b>
                      </small>
                    </div> */}
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
                      //   fullWidth
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      //   label="Select Segment"
                      multiple
                      required
                      value={selectSegment}
                      onChange={handleChange}
                      // input={<OutlinedInput label="Name" />}
                      label="Outlined"
                      variant="outlined"
                      MenuProps={MenuProps}
                    >
                      {allSegment.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item._id}
                          style={getStyles(
                            item.vehicle_name,
                            selectSegment,
                            theme
                          )}
                        >
                          {item.vehicle_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Brand Name:
                      </b>
                    </small>
                  </div>
                  <input
                    style={{ height: "50px" }}
                    type="text"
                    required
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        brandData.current.brand_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    placeholder="Enter Brand Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Brand Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        brandData.current.brand_description = e.target.value;
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
                        <span className="text-danger">*</span>Add Brand Icon:
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
                    <div className="box_style img-btn border">
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
                      setSelectSegment([]);
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
          <h5 className="px-3">Edit Brand</h5>
          <hr />
          <form onSubmit={checkNameForUpdate}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
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
                      required
                      fullWidth
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={selectSegment}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      // input={<OutlinedInput label="Name" />}
                      label="Outlined"
                      variant="outlined"
                      MenuProps={MenuProps}
                    >
                      {allSegment.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item._id}
                          style={getStyles(
                            item.vehicle_name,
                            selectSegment,
                            theme
                          )}
                        >
                          {item.vehicle_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Brand Name:
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
                        brandData.current.brand_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    defaultValue={
                      brandData.current ? brandData.current.brand_name : ""
                    }
                    placeholder="Enter Brand Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Brand Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    defaultValue={
                      brandData.current
                        ? brandData.current.brand_description
                        : ""
                    }
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        brandData.current.brand_description = e.target.value;
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
                        <span className="text-danger">*</span>Update Brand Icon:
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
                    <div className="box_style img-btn border">
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
                      setSelectSegment([])
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

      <h1 className="mt-2 fs-2 mx-3">Brand</h1>
      {/* <Box className="pb-3 d-flex justify-content-between"> */}
      <div className=" d-flex justify-content-between">
        <div style={{ marginLeft: "18px", width: "600px" }} md={6}>
          <input
            className="w-75 form-control ml-4"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearchClick(e.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", marginRight: "18px" }}
          // className="d-flex justify-content-end"
          // md={6}
        >
          <Button
            className="btn_primary"
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Add Brand
          </Button>
        </div>
      </div>
      {/* </Box> */}

      <Box align="right" className="px-3 pb-3"></Box>
      <div className="px-3">
        <TableContainer component={Paper}>
          <Table className="">
            <TableHead>
              <TableRow>
                <TableCell className="w-25">
                  <b>&nbsp;</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Name</b>
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
                          res.brand_image
                            ? res.brand_image
                            : "images/noImage.png"
                        }
                      />
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.brand_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        className="pointer"
                        onClick={() => {
                          setDeletedComp({
                            id: res._id,
                            index,
                            icon: res.brand_image,
                          });
                          setDeleteModel(true);
                        }}
                      />
                      &nbsp;&nbsp;
                      <Edit
                        className="pointer"
                        onClick={() => {
                          getBrandById(res._id, res.brand_image);
                        }}
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
              total={allCompanies.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </div>
    </>
  );
};
