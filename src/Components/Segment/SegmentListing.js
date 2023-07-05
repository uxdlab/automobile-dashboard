import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { VehicleClass } from "../../services/Vehicle";
import { Triangle } from "react-loader-spinner";
import { Delete, Edit } from "@mui/icons-material";
import { storage } from "../../auth/Firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { SnackBar } from "../Assets/SnackBar";
import Pagination from "rc-pagination";

export const SegmentListing = () => {
  const [serchValue, setSearchValue] = useState("");
  const [allVehicles, setAllVehicles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deleteVeh, setDeletedVeh] = useState({ id: "", index: "", icon: "" });
  const [deleteModel, setDeleteModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgStatus, setImgStatus] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [localImg, setLocalImg] = useState();
  console.log(localImg);
  const [img, setImg] = useState({});
  console.log(img);
  const [imgURL, setImgURL] = useState("");
  const [id, setId] = useState("");
  console.log(id);
  const segmentData = useRef({
    vehicle_name: "",
    vehicle_description: "",
    vehicle_icon: "",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  const [allProductC, setAllProductc] = useState([]);
  const [collection, setCollection] = React.useState([]);

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allVehicles]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allVehicles.slice(from, to));
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  //   function test(e){
  //     data.filter((item)=>item.name.includes(e.target.value.toLocalLowerCase()))
  //   }

  function handleSearchClick(search) {
    console.log(search);
    if (search.length === 0) {
      setCollection(allVehicles.slice(0, countPerPage));
    }
      if (search.trim().length !== 0){
        const filterBySearch = allVehicles.filter((item) => {
           let result;
           if( item.vehicle_name.includes(search.trim().toLocaleLowerCase())){
 result = true;
           }
           else{
 result = false;
           }
          return result;
        

        });
          setCollection(filterBySearch);
          setAllVehicles(filterBySearch);
      }else{
setAllVehicles(allProductC);
      }
    ;
    // setCollection(filterBySearch);
    // setAllVehicles(filterBySearch);
    // allVehicles(allProductC);
  }
  async function getAllVehicles() {
    setLoader(true);
    VehicleClass.getAllVehicles()
      .then((res) => {
        setAllVehicles(res.data.data);
        setAllProductc(res.data.data);
        setLoader(false);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  async function deleteVehicle() {
    console.log(deleteVeh.icon);
    setDeleteModel(false);
    setLoader(true);
    VehicleClass.deleteVehicle(deleteVeh.id)
      .then((res) => {
        console.log(res);
        let arr = [...allVehicles];
        arr.splice(deleteVeh.index, 1);
        setAllVehicles(arr);
        if (deleteVeh.icon !== "") {
          const storage = getStorage();
          const desertRef = ref(storage, deleteVeh.icon);
          deleteObject(desertRef)
            .then(() => {
              console.log("image deleted");
              VehicleClass.deleteVehicle(deleteVeh.id)
                .then((res) => {
                  console.log(res);
                  let arr = [...allVehicles];
                  arr.splice(deleteVeh.index, 1);
                  setAllVehicles(arr);
                  setLoader(false);
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Segment Deleted successfully",
                    type: "success",
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((error) => {});
        }
        setLoader(false);
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Segment Deleted successfully",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  }

  async function addSegment(e) {
    e.preventDefault();
    setLoader(true);
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
          segmentData.current.vehicle_icon = url;
          console.log(segmentData.current);

          VehicleClass.addVehicle(segmentData.current)
            .then((res) => {
              console.log(res);
              setLoader(false);
              getAllVehicles();
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Segment Added successfully",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
              setLoader(false);
              getAllVehicles();
            });
        });
      }
    );
    setLocalImg("");
    setImg({});
    segmentData.current.vehicle_icon = "";
  }

  async function updateSegment(e) {
    e.preventDefault();
    setLoader(true);
    setOpen1(false);
    console.log(img);
    console.log(segmentData.current);
    if (imgStatus) {
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
                segmentData.current.vehicle_icon = url;
                VehicleClass.editVehicle(id, segmentData.current)
                  .then((res) => {
                    console.log(res);
                    setLoader(false);
                    getAllVehicles();
                    ShowSnackbar({
                      show: true,
                      vertical: "top",
                      horizontal: "right",
                      msg: "Segment Updated successfully",
                      type: "success",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          );
        })
        .catch((error) => {});
    } else {
      //   const storageRef = ref(storage, img.name);
      //   const uploadTask = uploadBytesResumable(storageRef, img);
      //   uploadTask.on(
      // "state_changed",
      // (snapshot) => {},
      // (err) => console.log(err),
      // () => {
      //   getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      // console.log(url);
      // segmentData.current.vehicle_icon = url;
      VehicleClass.editVehicle(id, segmentData.current)
        .then((res) => {
          console.log(res);
          setLoader(false);
          getAllVehicles();
          setLoader(false);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Segment Updated successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
      //   });
      // }
      //   );
    }
    setLocalImg("");
    setImg({});
  }

  async function getSegmentById(idd, icon) {
    setImgURL(icon);
    setLoader(true);
    setId(idd);
    VehicleClass.getVehicle(idd)
      .then((res) => {
        console.log(res);
        segmentData.current = res.data.data[0];
        if (segmentData.current.vehicle_icon) {
          console.log(segmentData.current.vehicle_icon);
          setLocalImg(segmentData.current.vehicle_icon);
        }
        setLoader(false);
        setOpen1(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function switchBtn(e, id, index) {
    setLoader(true);

    VehicleClass.editVehicle(id, { is_active: e.target.checked }).then(
      (res) => {
        console.log(res);
        setLoader(false);

        let arr2 = [...allVehicles];
        arr2[index].is_active = !e.target.checked;
      }
    );
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
      let arr = allVehicles.filter(
        (item) => item.vehicle_name === segmentData.current.vehicle_name
      );
      if (arr.length !== 0) {
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Segment Already Exist",
          type: "error",
        });
      } else {
        addSegment(e);
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
    let arr = allVehicles.filter(
      (item) =>
        item.vehicle_name === segmentData.current.vehicle_name &&
        item._id !== segmentData.current._id
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Segment Already Exist",
        type: "error",
      });
    } else {
      updateSegment(e);
    }
  };

  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <Box sx={{ width: "100%" }} px={2}>
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
                onClick={deleteVehicle}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Dialog>

        {/* Add Segment Dialog Box */}
        <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Add New Segment</h5>
            <hr />
            <form onSubmit={ExistNameCheck}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span>Segment Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        if (e.target.value === " ") {
                          e.target.value = "";
                        } else {
                          segmentData.current.vehicle_name = e.target.value
                            .trim()
                            .toLocaleLowerCase();
                        }
                      }}
                      placeholder="Enter Segment Name"
                      className="form-control w-100 mb-2"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Segment Description:</b>
                      </small>
                    </div>
                    <textarea
                      className="w-100 form-control"
                      onChange={(e) => {
                        if (e.target.value === " ") {
                          e.target.value = "";
                        } else {
                          segmentData.current.vehicle_description = e.target.value.trim();
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
                          <span className="text-danger">*</span>Add Segment
                          Icon:
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
                              console.log(e.target);
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

        {/* Edit Segment Dialog Box */}
        <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Edit Segment</h5>
            <hr />
            <form onSubmit={checkNameForUpdate}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span>Segment Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        if (e.target.value === " ") {
                          e.target.value = "";
                        } else {
                          segmentData.current.vehicle_name = e.target.value
                            .trim()
                            .toLocaleLowerCase();
                        }
                      }}
                      defaultValue={segmentData.current.vehicle_name}
                      placeholder="Enter Segment Name"
                      className="form-control w-100 mb-2"
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Segment Description:</b>
                      </small>
                    </div>
                    <textarea
                      defaultValue={segmentData.current.vehicle_description}
                      className="w-100 form-control"
                      onChange={(e) => {
                        if (e.target.value === " ") {
                          e.target.value = "";
                        } else {
                          segmentData.current.vehicle_description = e.target.value.trim();
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
                          <span className="text-danger">*</span>Update Segment
                          Icon:
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
                              setImgStatus(true);
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

        <h1 className="mt-2 fs-2 ">Segment</h1>
        <Box className="pb-3 d-flex justify-content-between">
          <Grid container>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12} className="d-flex justify-content-end">
              <Button
                className="btn_primary"
                align=""
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Segment
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper}>
          <Table className="border">
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
                          res.vehicle_icon
                            ? res.vehicle_icon
                            : "images/noImage.png"
                        }
                      />
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.vehicle_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        className="pointer"
                        onClick={() => {
                          setDeletedVeh({
                            id: res._id,
                            index,
                            icon: res.vehicle_icon,
                          });
                          setDeleteModel(true);
                        }}
                      />
                      &nbsp;&nbsp;
                      <Edit
                        className="pointer"
                        onClick={() => {
                          getSegmentById(res._id, res.vehicle_icon);
                          setImgStatus(false);
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
              total={allVehicles.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </Box>
    </>
  );
};
