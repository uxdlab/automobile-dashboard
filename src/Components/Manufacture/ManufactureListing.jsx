import {
  Backdrop,
  Box,
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import {
  addManufacturers,
  deleteManufacturers,
  editManufacturers,
  getAllManufacturers,
  getManufacturerById,
} from "../../services/Manufacture";
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

export const ManufactureListing = () => {
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  const [allManufecture, setManufacture] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deletedComp, setDeletedComp] = useState({ id: "", index: "" });
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
  const [backUpData,setBackUpData] = useState([])
  const [id, setId] = useState("");
  let manufacturerData = useRef({
    manufacturer_name: "",
    manufacturer_description: "",
    manufacturer_icon: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  // const [search, setSearch] = React.useState("");
  const [allProductC, setAllProductc] = useState([]);
  const [collection, setCollection] = React.useState([]);

  function handleSearchClick(e) {
    let data = [...backUpData]
    let val = e.toLowerCase()
    let dd = data.filter(res => res.manufacturer_name.toLowerCase().includes(val))
    setManufacture(dd);
    setAllProductc(dd);
  }
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allManufecture]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allManufecture.slice(from, to));
  };
  useEffect(() => {
    getAllManufacture();
  }, []);

  function getAllManufacture() {
    setLoader(true);

    getAllManufacturers()
      .then((res) => {
        setLoader(false);
        let dd = [...res.data.data];
        console.log(dd.reverse());
        setManufacture(dd.reverse());
        setAllProductc(dd.reverse());
        setBackUpData(dd.reverse());
        setLoader(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteManufacturer() {
    setDeleteModel(false);
    setLoader(true);
    if (deletedComp.icon !== "") {
      const storage = getStorage();
      const desertRef = ref(storage, deletedComp.icon);
      deleteObject(desertRef)
        .then(() => {
          console.log("image deleted");
          deleteManufacturers(deletedComp.id)
            .then((res) => {
              let arr = [...allManufecture];
              arr.splice(deletedComp.index, 1);
              setManufacture(arr);
              setLoader(false);
              ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Manufacturer Deleted successfully",
                type: "success",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {});
    } else {
      deleteManufacturers(deletedComp.id)
        .then((res) => {
          let arr = [...allManufecture];
          arr.splice(deletedComp.index, 1);
          setManufacture(arr);
          setLoader(false);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Manufacturer Deleted successfully",
            type: "success",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  async function addManufacturer(e) {
    e.preventDefault();
    setLoader(true);
    setOpen(false);
    if (img.name !== undefined) {
      const storageRef = ref(storage, img.name);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            manufacturerData.current.manufacturer_icon = url;
            console.log(manufacturerData.current);
            addManufacturers(manufacturerData.current)
              .then((res) => {
                console.log(res);
                getAllManufacture();
                ShowSnackbar({
                  show: true,
                  vertical: "top",
                  horizontal: "right",
                  msg: "Manufacturer Added successfully",
                  type: "success",
                });
              })
              .catch((err) => {
                console.log(err);
                ShowSnackbar({
                  show: true,
                  vertical: "top",
                  horizontal: "right",
                  msg: "Manufacturer Already Exist",
                  type: "error",
                });
                getAllManufacture();
              });
            setLoader(false);
          });
        }
      );
    } else {
      manufacturerData.current.manufacturer_icon = "";
      addManufacturers(manufacturerData.current)
        .then((res) => {
          console.log(res);
          getAllManufacture();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Manufacturer Added successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Manufacturer Already Exist",
            type: "error",
          });
          getAllManufacture();
        });
      setLoader(false);
    }
    setLocalImg("");
    setImg({});
    manufacturerData.current.manufacturer_icon = "";
  }

  async function updateManufacturer(e) {
    e.preventDefault();
    setLoader(true);
    setOpen1(false);
    if (img.name !== undefined) {
      if (manufacturerData.current.manufacturer_icon !== "") {
        const storage = getStorage();
        const desertRef = ref(storage, imgURL);
        deleteObject(desertRef)
          .then(() => {
            console.log("image deleted");
            const storageRef = ref(storage, img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (err) => console.log(err),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url);
                  manufacturerData.current.manufacturer_icon = url;
                  console.log(manufacturerData.current.manufacturer_icon);
                  editManufacturers(id, manufacturerData.current)
                    .then((res) => {
                      console.log(res);
                      setLoader(false);
                      getAllManufacture();
                      ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Manufacturer Updated successfully",
                        type: "success",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Manufacturer Already Exist",
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
        const storageRef = ref(storage, img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              manufacturerData.current.manufacturer_icon = url;
              editManufacturers(id, manufacturerData.current)
                .then((res) => {
                  console.log(res);
                  setLoader(false);
                  getAllManufacture();
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Manufacturer Updated successfully",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Manufacturer Already Exist",
                    type: "error",
                  });
                  setLoader(false);
                });
            });
          }
        );
      }
    } else {
      editManufacturers(id, manufacturerData.current)
        .then((res) => {
          console.log(res);
          setLoader(false);
          getAllManufacture();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Manufacturer Updated successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Manufacturer Already Exist",
            type: "error",
          });
          setLoader(false);
        });
    }
    setLocalImg("");
    setImg({});
  }

  async function getManufacturerByIdd(idd, icon) {
    setLoader(true);
    setImgURL(icon);
    setId(idd);
    getManufacturerById(idd)
      .then((res) => {
        console.log(res);
        manufacturerData.current = res.data.data;
        if (manufacturerData.current.manufacturer_icon) {
          console.log(manufacturerData.current.manufacturer_icon);
          setLocalImg(manufacturerData.current.manufacturer_icon);
        }
        setLoader(false);
        setOpen1(true);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
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

  const ExistNameCheck = (e) => {
    e.preventDefault();
    let arr = allManufecture.filter(
      (item) =>
        item.manufacturer_name === manufacturerData.current.manufacturer_name
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Manufacturer Already Exist",
        type: "error",
      });
    } else {
      addManufacturer(e);
    }
  };

  const checkNameForUpdate = (e) => {
    e.preventDefault();
    let arr = allManufecture.filter(
      (item) =>
        item.manufacturer_name === manufacturerData.current.manufacturer_name &&
        item._id !== manufacturerData.current._id
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Manufacturer Already Exist",
        type: "error",
      });
    } else {
      updateManufacturer(e);
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
              onClick={() => setDeleteModel(!deleteModel)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="custom-btn"
              onClick={deleteManufacturer}
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

      {/* Add Manufacturer Dialog Box */}
      <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Add New Manufacturer</h5>
          <hr />
          <form onSubmit={ExistNameCheck}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Manufacturer Name:
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
                        manufacturerData.current.manufacturer_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    placeholder="Enter Manufacturer Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Manufacturer Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        manufacturerData.current.manufacturer_description =
                          e.target.value;
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
                        <span className="text-danger"></span>Add Manufacturer
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
                      manufacturerData.current = {};
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

      {/* Edit Manufacturer Dialog Box */}
      <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Edit Manufacturer</h5>
          <hr />
          <form onSubmit={checkNameForUpdate}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Manufacturer Name:
                      </b>
                    </small>
                  </div>
                  <input
                    type="text"
                    required
                    defaultValue={manufacturerData.current.manufacturer_name}
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        manufacturerData.current.manufacturer_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    placeholder="Enter Manufacturer Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Manufacturer Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    defaultValue={
                      manufacturerData.current.manufacturer_description
                    }
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        manufacturerData.current.manufacturer_description =
                          e.target.value;
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
                        <span className="text-danger"></span>Update Manufacturer
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
                      manufacturerData.current = {};
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

      <h1 className="mt-2 fs-2 mx-3">Manufacturer</h1>
      <div className=" d-flex justify-content-between">
        <div style={{ marginLeft: "18px", width: "600px" }}>
          <input
            className="w-75 form-control ml-4"
            type="search"
            placeholder="Search Here By Name"
            onChange={(e) => {
              if(e.target.value == ' '){
                e.target.value = ''
              }else{
              setSearchValue(e.target.value);
              handleSearchClick(e.target.value);
              }
            }}
          />
        </div>
        <div style={{ marginRight: "18px" }}>
          <Button
            className="btn_primary"
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Add manufacturer
          </Button>
        </div>
      </div>

      {/* <Box align="right" className="px-3 pb-3"></Box> */}
      <div className="p-3">
        <TableContainer component={Paper}>
          <Table>
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
                          res.manufacturer_icon
                            ? res.manufacturer_icon
                            : "images/noImage.png"
                        }
                      />
                    </TableCell>
                    <TableCell className="text-center text_cap">
                      {res.manufacturer_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setDeletedComp({
                            id: res._id,
                            index,
                            icon: res.manufacturer_icon,
                          });
                          setDeleteModel(!deleteModel);
                        }}
                      />
                      &nbsp;&nbsp;
                      <Edit
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          getManufacturerByIdd(res._id, res.manufacturer_icon);
                          setOpen1(true);
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
              total={allManufecture.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </div>
    </>
  );
};
