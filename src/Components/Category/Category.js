import { Delete, Edit } from "@mui/icons-material";
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
import { ProductClass } from "../../services/Product";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { SnackBar } from "../Assets/SnackBar";
import Pagination from "rc-pagination";

export const Category = () => {
  const [loader, setLoader] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [deletedVeh, setDeletedVeh] = useState({ id: "", index: "", icon: "" });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [backUpData, setBackUpData] = useState([])
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
  const allCategory = useRef({
    category_name: "",
    category_description: "",
    category_icon: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  const [allProductC, setAllProductc] = useState([]);
  const [collection, setCollection] = React.useState([]);


  function handleSearchClick(e) {
    let data = [...backUpData]
    let val = e.toLowerCase()
    let dd = data.filter(res => res.category_name.toLowerCase().includes(val))
    setAllProducts(dd);
    setAllProductc(dd);

  }

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allProducts]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allProducts.slice(from, to));
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  async function getAllProducts() {
    setLoader(true);
    ProductClass.getAllProducts()
      .then((res) => {
        let dd = [...res.data.data];
        let newData = dd.reverse()
        setAllProducts(newData);
        setAllProductc(newData);
        setBackUpData(newData);
        setLoader(false);

      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }

  async function deleteImg(img) {
    const storage = getStorage();
    const desertRef = ref(storage, img);
    return await deleteObject(desertRef)
  }


  async function deleteProduct() {
    setLoader(true);
    setDeleteModel(false);
    if (deletedVeh.icon !== '') {
      let res = await deleteImg(deletedVeh.icon)
    }

    await ProductClass.deleteProduct(deletedVeh.id)
      .then((res) => {
        console.log(res);
        getAllProducts()
        setLoader(false);
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Category Deleted successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err)
        getAllProducts()
      });

  }

  const UploadImage = async (imageFile) => {

    const storageRef = ref(storage, `images/${imageFile.name}${Math.random()}.jpg`);

    const upload = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(upload.ref);
    return downloadURL;
  };

  async function addCategory(e) {
    e.preventDefault();
    setLoader(true);
    setOpen(false);

    if (img.name !== undefined) {
      let url = await UploadImage(img)
      allCategory.current.category_icon = url
    } else {
      allCategory.current.category_icon = ''
    }
    await ProductClass.addProduct(allCategory.current)
      .then((res) => {
        console.log(res);
        getAllProducts();
        setLoader(false);
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Category Added successfully",
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
          msg: "Category Already Exist",
          type: "error",
        });
        getAllProducts();
      });
    setLocalImg("");
    setImg({});
    allCategory.current.category_icon = ""

  }

  async function updateCategory(e) {
    e.preventDefault();
    setLoader(true);
    setOpen1(false);
    let url = ''
    if (img.name !== undefined) {
      if (allCategory.current.category_icon !== '') {
        await deleteImg(allCategory.current.category_icon)
      }
     url = await UploadImage(img)
     allCategory.current.category_icon = url
    } else {
      if (localImg == '') {
        if (allCategory.current.category_icon !== '') {
          await deleteImg(allCategory.current.category_icon)
          allCategory.current.category_icon = ''
        }else{
          allCategory.current.category_icon = ''
        }
      }
    }

   await ProductClass.editProduct(id, allCategory.current)
    .then((res) => {
      console.log(res);
      setLoader(false);
      getAllProducts();
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Category Updated successfully",
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
        msg: "Category Already Exist",
        type: "error",
      });
      setLoader(false);
    });
    
    setImg({})
    setLocalImg("");
  }

  async function getCategoryById(idd, icon) {
    setLoader(true);
    setImgURL(icon);
    setId(idd);
    ProductClass.getProduct(idd)
      .then((res) => {
        allCategory.current = res.data.data;
        if (allCategory.current.category_icon !== '') {
          setLocalImg(allCategory.current.category_icon);
        } else {
          setLocalImg('')
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
      setImg(imgs);
      if (imgs.name !== undefined) {
        let url = URL.createObjectURL(imgs);
        setLocalImg(url);
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
    let arr = allProducts.filter(
      (item) => item.category_name === allCategory.current.category_name
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Category Already Exist",
        type: "error",
      });
    } else {
      addCategory(e);
    }
  };

  const checkNameForUpdate = (e) => {
    e.preventDefault();
    let arr = allProducts.filter(
      (item) =>
        item.category_name === allCategory.current.category_name &&
        item._id !== allCategory.current._id
    );
    if (arr.length !== 0) {
      ShowSnackbar({
        show: true,
        vertical: "top",
        horizontal: "right",
        msg: "Category Already Exist",
        type: "error",
      });
    } else {
      updateCategory(e);
    }
  };

  return (
    <Box>
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
              onClick={deleteProduct}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Add Brand Dialog Box */}
      <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Add New Category</h5>
          <hr />
          <form onSubmit={ExistNameCheck}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Category Name:
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
                        allCategory.current.category_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    placeholder="Enter Category Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Category Description:</b>
                    </small>
                  </div>
                  <textarea
                    className="w-100 form-control"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        allCategory.current.category_description =
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
                        <span className="text-danger"></span>Add Category Icon:
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

      {/* Edit Category Dialog Box */}
      <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
        <Box py={2} px={1} className="over-flow-hide-x">
          <h5 className="px-3">Edit Category</h5>
          <hr />
          <form onSubmit={checkNameForUpdate}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>
                        <span className="text-danger">*</span>Category Name:
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
                        allCategory.current.category_name = e.target.value
                          .trim()
                          .toLocaleLowerCase();
                      }
                    }}
                    defaultValue={allCategory.current.category_name}
                    placeholder="Enter Category Name"
                    className="form-control w-100 mb-2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="py-2">
                    <small>
                      <b>Category Description:</b>
                    </small>
                  </div>
                  <textarea
                    defaultValue={allCategory.current.category_description}
                    className="w-100 form-control"
                    onChange={(e) => {
                      if (e.target.value == " ") {
                        e.target.value = "";
                      } else {
                        allCategory.current.category_description =
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
                        <span className="text-danger"></span>Update Category
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

      <h1 className="mt-2 fs-2 mx-3">Category</h1>
      <div className=" d-flex justify-content-between">
        <div style={{ marginLeft: "18px", width: "600px" }}>
          <input
            className="w-75 form-control ml-4"
            type="search"
            placeholder="Search Here By Name"
            onChange={(e) => {
              if (e.target.value == ' ') {
                e.target.value = ''
              } else {
                setSearchValue(e.target.value);
                handleSearchClick(e.target.value);
              }
            }}
          />
        </div>
        <div style={{ marginRight: "18px" }}>
          <Button
            className="btn_primary"
            onClick={() => {
              setOpen(true)
              setImg({})
            }}
            variant="contained"
          >
            Add Category
          </Button>
        </div>
      </div>
      {/* <Box align="right" className="px-3"></Box> */}

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
                          res.category_icon
                            ? res.category_icon
                            : "images/noImage.png"
                        }
                      />
                    </TableCell>
                    <TableCell className="text-center text_cap">
                      {res.category_name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        className="pointer"
                        onClick={() => {
                          setDeletedVeh({
                            id: res._id,
                            index,
                            icon: res.category_icon,
                          });
                          setDeleteModel(true);
                        }}
                      />
                      &nbsp;&nbsp;
                      <Edit
                        className="pointer"
                        onClick={() =>
                          getCategoryById(res._id, res.category_icon)
                        }
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
              total={allProducts.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </div>
    </Box>
  );
};
