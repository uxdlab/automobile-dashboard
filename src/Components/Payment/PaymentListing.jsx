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
          let data = res.data.data.map((e) => e.paymentDetails);
          console.log(data);
          setAllPayment(data);
          setCollection(data);
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
      <>
        {/* <div class="container-fluid">
        <div class="row">
            <div class="col">
            <div class="table-responsive">
            <table class="table my-3 border">
                <thead class="thead-light">
                <tr>
                    <th scope="col">OrderID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Subscription</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Order_Ldfdyd5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Akash</td>
                    <td>Subject</td>
                    <td>Physics</td>
                    <td>1000</td>
                    <td>Success</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Ldfdyd5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Physics</td>
                    <td>1000</td>
                    <td>Success</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>150</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Tfg45f45dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Ashok</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>100</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>mar 20,2023</td>
                    <td>Ankush</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>100</td>
                    <td>Test</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_Fgf565d5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>15</td>
                    <td>Alpha_Testing</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Order_R54f5gf5dfg8sfg5</td>
                    <td>Feb 15,2023</td>
                    <td>Rajeev</td>
                    <td>Subject</td>
                    <td>Alpha Testing</td>
                    <td>250</td>
                    <td>Alpha_Testing</td>
                    <td>...</td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div> */}
      </>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">
                <b>OrderID</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Name</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Amount</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Email</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Phone Number</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Date And Time</b>
              </TableCell>
              <TableCell className="text-center">
                <b>Payment Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((res, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="text_cap text-center">
                    {res.orderId}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.buyerName}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.amount}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.buyerEmail}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.buyerPhone}
                  </TableCell>
                  <TableCell className="text_cap text-center">
                    {res.createdDateTime}
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
