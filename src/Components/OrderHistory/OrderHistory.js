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
} from "@mui/material";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { gerAllPayment } from "../../services/Payment";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { apis } from "../../auth/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const OrderHistory = () => {
  const [collection, setCollection] = React.useState([]);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [allPayment, setAllPayment] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    gerAllPayment()
      .then((res) => {
        console.log(res.data.data);
        setAllPayment(res.data.data);
        updatePage(currentPage); // Update page when data is fetched
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(collection, "hduehdu");

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

  // useEffect(() => {
  //   getAllPaymentDetails();
  // }, []);
  React.useEffect(() => {
    getAllPaymentDetails();
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
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
                <b> Amount </b>
              </TableCell>
              <TableCell className="text-center">
                <b> Order Status</b>
              </TableCell>
              <TableCell className="text-center">
                <b> view </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection &&
              collection?.map((res) => {
                // Convert the ISO date string to a JavaScript Date object
                const dateObject = new Date(
                  res?.paymentDetails?.createdDateTime
                );

                const formattedDate = `${dateObject.getFullYear()}-${dateObject.getMonth() +
                  1}-${dateObject.getDate()}`;

                const formattedTime = `${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;

                return (
                  <TableRow key={res?.paymentDetails?.orderId}>
                    <TableCell className="text-center">
                      {res?.paymentDetails?.orderId}
                    </TableCell>

                    <TableCell className="text-center">
                      {formattedDate}
                    </TableCell>
                    <TableCell className="text-center">
                      {formattedTime}
                    </TableCell>
                    <TableCell className="text-center">
                      {res.shipping_details?.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {res.shipping_details?.mobile_number}
                    </TableCell>
                    <TableCell className="text-center">
                      {res?.paymentMode}
                    </TableCell>

                    <TableCell className="text-center">
                      {" "}
                      ₹ {res?.paymentDetails?.amount}
                    </TableCell>

                    <TableCell className="text-center">
                      <div style={{ display: "flex", gap: "10px" }}>
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
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        size="small"
                        style={{
                          backgroundColor: "#534ba8",
                          color: "white",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        View
                      </Button>
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
                <TableBody></TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default OrderHistory;
