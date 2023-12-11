import React, { useState, useEffect } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Backdrop,
} from "@mui/material";

import style from "./style.module.css";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { gerAllPayment } from "../../services/Payment";

import axios from "axios";
import { apis } from "../../auth/api";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [collection, setCollection] = React.useState([]);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [allPayment, setAllPayment] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!allPayment.length) return;

    updatePage(currentPage);
  }, [countPerPage, allPayment, currentPage]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allPayment.slice(from, to));
  };

  const getAllPaymentDetails = () => {
    setLoader(true);
    gerAllPayment()
      .then((res) => {
        let dd = [...res.data.data];
        console.log(dd);
        setAllPayment(dd.reverse());
        updatePage(currentPage);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  console.log(collection, "hduehdu");
  const totalAmount = (arr) => {
    console.log(arr);
    if (arr.productsData.length !== 0) {
      let total = 0;
      arr.productsData.forEach(s => {
        let datas= arr.subscriptionData.filter(e=>e.product_id===s._id)
        total = total + (s.MRP*datas[0].quantity)
      
      });
      return total
    } else {
      return 0;
    }
  }
  const handleStatusChange = async (e, id) => {
    try {
      const response = await axios.put(
        apis.baseUrl + `payment/updateStatus/${id}`,
        {
          status: e.target.value,
        }
      );

      console.log("Payment status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating payment status:", error.message);
    }
    getAllPaymentDetails();
  };

  React.useEffect(() => {
    getAllPaymentDetails();
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
      <div style={{ maxWidth: "100%", overflowX: "hidden", overflowY: "auto" }}>
        <h1 className="px-2">Order History</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b> Order Id</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Date</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Time </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Customer Name </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Customer Number </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Mode of Payment </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Total Amount </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Discount </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Amount </b>
                </TableCell>
                <TableCell className="text-center">
                  <b> Order Status</b>
                </TableCell>
                <TableCell className="text-center">
                  <b> View </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection &&
                collection?.map((res) => {
                  const dateObject = new Date(
                    res?.paymentDetails?.createdDateTime
                  );

                  const formattedDate = `${dateObject.getFullYear()}-${dateObject.getMonth() +
                    1}-${dateObject.getDate()}`;

                  const formattedTime = `${dateObject.getHours()}:${dateObject.getMinutes()}`;

                  return (
                    <TableRow key={res?.paymentDetails?.orderId}>
                      <TableCell className="text-center text-capitalize ">
                        {res?.paymentDetails?.orderId}
                      </TableCell>

                      <TableCell className="text-center text-capitalize">
                        {formattedDate}
                      </TableCell>
                      <TableCell className="text-center text-capitalize">
                        {formattedTime}
                      </TableCell>
                      <TableCell className="text-center text-capitalize">
                        {res?.paymentDetails?.buyerName
                          ? res?.paymentDetails?.buyerName
                          : res.shipping_details?.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {res?.paymentDetails?.buyerPhone
                          ? res?.paymentDetails?.buyerPhone
                          : res.shipping_details?.mobile_number}
                      </TableCell>
                      <TableCell className="text-center text-capitalize ">
                        {res?.paymentMode === "cash" ? "COD" : "Online"}
                      </TableCell>
                      <TableCell className="text-center text-capitalize">
                        {" "}
                        ₹ {totalAmount(res) !== 0 ? totalAmount(res) : res?.paymentDetails?.amount}
                      </TableCell>
                      <TableCell className="text-center text-capitalize">
                        {" "}
                        ₹ {totalAmount(res) !== 0 ? totalAmount(res)-res?.paymentDetails?.amount : 0}
                      </TableCell>
                      <TableCell className="text-center text-capitalize">
                        {" "}
                        ₹ {res?.paymentDetails?.amount}
                      </TableCell>

                      <TableCell className="text-center text-capitalize">
                        {res?.paymentDetails?.paymentStatus === "Pending" ? (
                          <select
                            id=""
                            className={style.customSelect}
                            onChange={(e) => handleStatusChange(e, res._id)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                          </select>
                        ) : (
                          <div>{res?.paymentDetails?.paymentStatus}</div>
                        )}
                      </TableCell>

                      <TableCell className="text-center">
                        <RemoveRedEyeIcon
                          // onClick={() => handleClickOpen(res._id)}
                          onClick={() =>
                            navigate(`viewOrderHistory/${res._id}`)
                          }
                          variant="contained"
                          size="small"
                          className={style.viewIcon}
                        />
                        {/* <Link to="viewOrderHistory"> view</Link> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Box
            sx={{ m: 1 }}
            className="d-flex justify-content-end align-items-center"
          >
            <select
              className="me-2"
              onChange={(e) => setCountPerPage(e.target.value * 1)}
            >
              <option>10</option>
              <option>15</option>
            </select>
            <span>Page:</span>
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={allPayment.length}
              style={{ marginLeft: "8px" }}
            />
          </Box>
        </TableContainer>
        {/* 
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            View Order History
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div style={{ maxWidth: "100%" }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="text-center">
                        <b> Customer email</b>
                      </TableCell>
                      <TableCell className="text-center">
                        <b>customer address</b>
                      </TableCell>
                      <TableCell className="text-center">
                        <b>Product Name </b>
                      </TableCell>
                      <TableCell className="text-center">
                        <b>Quantity </b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {viewHistory?.map((item) => {
                      console.log(item, "hdhdh");
                      return (
                        <>
                          <TableRow>
                            <TableCell className="text-center">
                              {item?.email}
                            </TableCell>
                            <TableCell className="text-center">{`${item?.address?.house_number}, ${item?.address?.city} ${item?.address?.state},${item?.address?.pincode}, ${item?.address?.country}`}</TableCell>
                            <TableCell className="text-center">
                              {console.log(
                                item.products[0].productName,
                                "tttttttt"
                              )}
                              {item.products[0].productName.map((item) => {
                                <TableCell>{item}</TableCell>;
                              })}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </BootstrapDialog> */}
      </div>
    </>
  );
};

export default OrderHistory;