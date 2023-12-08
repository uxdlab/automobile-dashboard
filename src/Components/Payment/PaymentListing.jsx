import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { gerAllPayment } from "../../services/Payment";
import { useEffect } from "react";
import Pagination from "rc-pagination";

export default function PaymentListing() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [allPayment, setAllPayment] = useState([]);
  const [value, setValue] = React.useState("");

  const [collection, setCollection] = React.useState(
    allPayment.slice(0, countPerPage)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allPayment]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allPayment.slice(from, to));
  };

  const getAllPaymentDetails = () => {
    gerAllPayment()
      .then((res) => {
        console.log(res);
        if (res.data.data) {
          let data = res.data.data.map((e) => {
            let detail = e.paymentDetails;
            detail.paymentMode = e.paymentMode;
            return detail;
          });
          console.log(data);
          let dd = [...data];
          console.log(dd.reverse());
          setAllPayment(dd.reverse());
          setCollection(dd.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPaymentDetails();
  }, []);
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          {/* <div class="col">
                <span class="para1">Dashboard / Student</span>
            </div> */}
        </div>
        <div class="col mt-2 d-flex justify-content-between">
          <h1 class="d-inline-block">Payment</h1>
          {/* <input type="search" placeholder='Search here' class="search_box mt-1 border"></input> */}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">
                <b>OrderID</b>
              </TableCell>

              <TableCell className="text-center">
                <b>Amount</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Date And Time</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Payment Mode</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Payment Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection?.map((res, index) => {
              const timestamp = new Date(res.createdDateTime);

              const formattedDate = timestamp.toLocaleDateString();
              const formattedTime = timestamp.toLocaleTimeString();

              return (
                <TableRow key={index}>
                  <TableCell className="text_cap text-center">
                    {res.orderId}
                  </TableCell>

                  <TableCell className="text_cap text-center">
                    ₹ {res.amount}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {formattedDate} - {formattedTime}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {console.log(res)}
                    {res.paymentMode === "cash" ? "Cash on Delivery" : "Online"}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.paymentStatus}
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
            total={allPayment.length}
            style={{ color: "green" }}
          />
        </Box>
      </TableContainer>
    </>
  );
}
