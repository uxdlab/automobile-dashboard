import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Backdrop
} from "@mui/material";
import React, { useRef, useState } from "react";
import { gerAllPayment } from "../../services/Payment";
import { useEffect } from "react";
import Pagination from "rc-pagination";
import { Triangle } from "react-loader-spinner";
import moment from "moment/moment";

export default function PaymentListing() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [allPayment, setAllPayment] = useState([]);
  const [value, setValue] = React.useState("");
  const [backUpData, setBackUpdata] = useState([])
  const [loader, setLoader] = useState(true)

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
        // console.log(res);
        if (res.data.data) {
          let data = res.data.data.map((e) => {
            let detail = e.paymentDetails;
            detail.paymentMode = e.paymentMode;
            return detail;
          });
          // console.log(data);
          let dd = [...data];
          let newData = dd.reverse()
          setAllPayment(newData);
          setCollection(newData);
          setBackUpdata(newData);
        }
        setLoader(false)
      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      });
  };

  function searchData(e) {
    let data = [...backUpData]
    let val = e.toLowerCase()
    let searchedData = data.filter(res => res.orderId !== undefined)
    let dd = searchedData.filter(res => res.orderId.toLowerCase().includes(val))
    setAllPayment(dd);
    setCollection(dd);
  }



  useEffect(() => {
    getAllPaymentDetails();
  }, []);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <Triangle
          height="80"
          width="80"
          color="black"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
        // visible={loader}
        />
      </Backdrop>

      <div className="container-fluid">
        <h1 className="d-inline-block mt-1">Payment Details</h1>
        <div className="row py-3">
          <div className="col-lg-5 col-md-6 col-sm-6 col-12">
            <input type="search" placeholder='Search Here By Order ID' onChange={(e) => {
              if (e.target.value == ' ') {
                e.target.value = ''
              } else {
                searchData(e.target.value)
              }
            }} className="form-control"></input>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b>Order ID</b>
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
               { console.log(collection)}
              {collection?.map((res, index) => {
                const timestamp = new Date(res.createdDateTime);
                // console.log(timestamp)
                const options1 = {
                  day: 'numeric',
                  month: 'numeric',
                 year: 'numeric',
                };
                const formattedDate = timestamp.toLocaleDateString( options1);
                // console.log(formattedDate)

                const options = {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                };
                const formattedTime = timestamp.toLocaleTimeString(
                  undefined,
                  options
                );

                return (
                  <TableRow key={index}>
                    <TableCell className="text_cap text-center">
                      {res.orderId}
                    </TableCell>

                    <TableCell className="text_cap text-center">
                      ₹ {res.amount}
                    </TableCell>

                    <TableCell className="text_cap text-center">
                      {/* {formattedDate} - {formattedTime} */}
                      {moment(res.createdDateTime).format("DD/MM/YYYY hh:mm A")}
                    </TableCell>

                    <TableCell className="text_cap text-center">
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
      </div>
    </>
  );
}
