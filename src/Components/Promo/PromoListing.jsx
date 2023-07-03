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
} from "../../services/Promo";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";

export default function PromoListing() {
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [editName,setEditName] = useState("");
  const[editDate,setEditDate] =useState("");
  const [editOrder, setEditOrder] = useState("");
  const [editDiscount, setEditDisount] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [promoName, setPromoName] = useState("");
  const [addexpireDate, setAddExpireDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [minimumOrder, setMinimumOreder] = useState("");
  const [allPromos, setAllPromos] = useState([]);
  const [id, setId] = useState("");
  const [propId,setPropId] = useState({})
  const [countPerPage, setCountPerPage] = useState(10);
  // const [collection, setCollection] = React.useState(
  //   allPromos.splice(0, countPerPage)
  // );


  const PromoData = useRef({
    promo_name: "",
    expire_at: "",
    discount_percentage: "",
    minimum_order: "",
  });

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllPromos = () => {
    setLoader(true);
    getAllPromo().then((res) => {

      setAllPromos(res.data);

    });
  };

  useEffect(() => {
    getAllPromos();
  }, []);

  const getPromosById = (id) =>{
     setLoader(true);
      setId(id);
      getPromoId(id)
      .then((res)=>{
        setPropId(res.data.data)
        setLoader(false);
        setOpen1(true);})
        .catch((err)=>{console.log(err)})

  }

  const updatePromos = () =>{
    // e.preventDefault()
    console.log(propId._id);
    
    // setLoader(true);
    // setOpen1(false);
    updatePromo(propId._id,{
 promo_name: editName,
   expire_at: editDate,
    discount_percentage: editDiscount,
    minimum_order:editOrder,
    })
    .then((res)=>{
      console.log(res)
    //  getPromosById();
    //  setLoader(false);
    }
   
  )
  .catch((err)=>{
    console.log(err)
  })
  }

  return (
    <>
      <Box sx={{ width: "100%" }} px={2}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          //   open={loader}
        >
          <Box>
            <Triangle
              height="80"
              width="80"
              color="black"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              //   visible={loader}
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
                        setPromoName(e.target.value);
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
                      id="exampleDate"
                      name="date"
                      placeholder="date placeholder"
                      type="date"
                      onChange={(e) => {
                        setAddExpireDate(e.target.value);
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
                      onChange={(e)=>{setEditName(e.target.value)}}
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
                      onChange={(e)=>{setEditDisount(e.target.value)}}
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
                      defaultValue={propId.minimum_order}
                      onChange={(e)=>{setEditOrder(e.target.value)}}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>Expiry Date:</b>
                      </small>
                    </div>
                    <input
                      id="exampleDate"
                      type="date"
                      name="date"
                      placeholder="date placeholder"
                      defaultValue={propId.expire_at}
                      onChange={(e)=>{setEditDate(e.target.value)}}
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
                  <b>Minimum Orde</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Expiry</b>
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
              {allPromos.map((res, index) => {
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
                      {res.expire_at}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.promo_code}
                    </TableCell>
                    <TableCell className="text-center">
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
        </TableContainer>
      </Box>
    </>
  );
}
