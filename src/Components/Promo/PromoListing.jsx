import {
  Backdrop,
  Box,
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  TableBody,
} from "@mui/material";
import { Triangle } from "react-loader-spinner";
import React, { useRef } from "react";
import { useState } from "react";
import { SnackBar } from "../Assets/SnackBar";
import {
  add,
  getAllPromo,
  getPromoId,
  updatePromo,
  deletePromo,
} from "../../services/Promo";
import moment from "moment/moment";
import Pagination from "rc-pagination";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import "./Style.css";

export default function PromoListing() {
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [searchValue, setSearchValue] = useState("");

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [promoName, setPromoName] = useState("");
  const [addexpireDate, setAddExpireDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [minimumOrder, setMinimumOreder] = useState("");
  const [allPromos, setAllPromos] = useState([]);
  const [id, setId] = useState("");
  const [propId, setPropId] = useState({});
  const [editDiscount, setEditDisount] = useState(propId.discount_percentage);
  const [editName, setEditName] = useState(propId.promo_name);
  const [editDate, setEditDate] = useState(propId.expire_at);
  const [editOrder, setEditOrder] = useState(propId.minimum_order);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [value, setValue] = React.useState("");
  const [countPerPage, setCountPerPage] = useState(10);
  const [allProductC, setAllProductc] = useState([]);
  const [collection, setCollection] = React.useState([]);
  console.log(allPromos.length);
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allPromos]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allPromos.slice(from, to));
  };
  const PromoData = useRef({
    promo_name: "",
    expire_at: "",
    discount_percentage: "",
    minimum_order: "",
  });
  function handleSearchClick(search) {
    console.log(allPromos);
    if (search.length === 0) {
      setCollection(allPromos.slice(0, countPerPage));
    }
    if (search.trim().length !== 0) {
      const filterBySearch = allProductC.filter((item) => {
        let result;
        if (
          item.promo_name
            .toLocaleLowerCase()
            .includes(search.trim().toLocaleLowerCase())
        ) {
          result = true;
        } else {
          result = false;
        }
        return result;
      });
      setCollection(filterBySearch);
      setAllPromos(filterBySearch);
    } else {
      setAllPromos(allProductC);
    }
  }

  const addPromos = (e, data) => {
    e.preventDefault();
    setLoader(true);
    setOpen(false);
    console.log({
      promo_name: promoName,
      expire_at: addexpireDate,
      discount_percentage: discount,
      minimum_order: minimumOrder,
    });
    add(
      {
        promo_name: promoName,
        expire_at: addexpireDate,
        discount_percentage: discount,
        minimum_order: minimumOrder,
      },
      data
    )
      .then((res) => {
        console.log(res);
        setLoader(false);
        getAllPromos();
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Promo Added successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Promo Already Exist",
          type: "error",
        });
      });
  };

  const getAllPromos = () => {
     setLoader(true);
    getAllPromo()
      .then((res) => {
        if(res){

          setAllPromos([...res.data].reverse());
          setAllProductc([...res.data].reverse());
        }
          setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPromos();
  }, []);

  const getPromosById = (id) => {
    setLoader(true);
    setId(id);
    getPromoId(id)
      .then((res) => {
        setPropId(res.data.data);
        setLoader(false);
        setOpen1(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePromos = (e) => {
    e.preventDefault();
    console.log({
      promo_name: editName,
      expire_at: editDate,
      discount_percentage: editDiscount,
      minimum_order: editOrder,
    });
 
    setLoader(true);
    setOpen1(false);
    updatePromo(propId._id, {
      promo_name: editName,
      expire_at: editDate,
      discount_percentage: editDiscount,
      minimum_order: editOrder,
    })
      .then((res) => {
        console.log(res);
        //  getPromosById();
        setLoader(false);
        getAllPromos();
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Promo Update successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

 const deletePromoCode = (id) =>{
   setLoader(true);
   deletePromo(id)
   .then((res)=>{console.log(res)
  setLoader(false);
   getAllPromos();
    ShowSnackbar({
           show: true,
           vertical: "top",
           horizontal: "right",
           msg: "Promo Code  Deleted successfully",
           type: "success",
         });
})
.catch((err)=>{console.log(err)})
  }

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
        <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Add New Promo</h5>
            <hr />
            <form onSubmit={addPromos}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span>Promo Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Promo Name"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        // setPromoName(e.target.value.trim());
                         if (e.target.value == " ") {
                           e.target.value = "";
                         } else {
                            setPromoName(e.target.value.trim());
                         }
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Discount Percentage</b>
                      </small>
                    </div>

                    <input
                      type="number"
                      required
                      placeholder="Enter Discount Percentage"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Minimum Order Amount:</b>
                      </small>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Minimum Order Amount"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        setMinimumOreder(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Expiry Date:</b>
                      </small>
                    </div>
                    <input
                      required
                      id="exampleDate"
                      name="date"
                      placeholder="date placeholder"
                      type="date"
                      onChange={(e) => {
                        setAddExpireDate(e.target.value);
                      }}
                      style={{
                        width: "400px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "2px solid grey",
                      }}
                    />
                  </div>
                  <Box align="right" className="mt-3">
                    <span
                      className="btn cancel_btn me-3 py-1 px-3"
                      onClick={() => {
                        setOpen(false);
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
        <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Edit Promo</h5>
            <hr />
            <form onSubmit={updatePromos}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span>Promo Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Promo Name"
                      className="form-control w-100 mb-2"
                      defaultValue={propId.promo_name}
                      onChange={(e) => {
                        setEditName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Discount Percentage</b>
                      </small>
                    </div>

                    <input
                      type="number"
                      required
                      placeholder="Enter Discount Percentage"
                      className="form-control w-100 mb-2"
                      defaultValue={propId.discount_percentage}
                      onChange={(e) => {
                        setEditDisount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Minimum Order Amount:</b>
                      </small>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Enter Minimum Order Amount"
                      className="form-control w-100 mb-2"
                      defaultValue={propId.minimum_order}
                      onChange={(e) => {
                        setEditOrder(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Expiry Date:</b>
                      </small>
                    </div>
                    <input
                      required
                      // id="exampleDate"
                      type="date"
                      name="date"
                      placeholder="date placeholder"
                      defaultValue={moment(propId.expire_at).format("YYYY-MM-DD")}
                      onChange={(e) => {
                     
                        setEditDate(e.target.value);
                      }}
                      style={{
                        width: "400px",
                        height: "40px",
                        borderRadius: "8px",
                        border: "2px solid grey",
                      }}
                    />
                  </div>
                  <Box align="right" className="mt-3">
                    <span
                      className="btn cancel_btn me-3 py-1 px-3"
                      onClick={() => {
                        setOpen1(false);
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
        <h1>Promo</h1>
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
                  // setSearch(e.target.value);
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
                Add Promo
              </Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table className="border">
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b>Name</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Discount</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Minimum Order</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Expiry Date</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Promo Code</b>
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
                    <TableCell className="text_cap text-center">
                      {res.promo_name}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.discount_percentage}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.minimum_order}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {moment(res.expire_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.promo_code}
                    </TableCell>
                    <TableCell className="text-center">
                       <Delete
                        className="pointer" onClick={(e)=>{deletePromoCode(res._id)}}/>
                      <Edit
                        onClick={() => {
                          console.log(res);
                          getPromosById(res._id);
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
              total={allPromos.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}
