import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Triangle } from "react-loader-spinner";
import { getDetails } from "../../services/Payment";
import style from "./style.module.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ViewOrderHistory = () => {
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const { Id } = useParams();
  const navigate = useNavigate()

  const getAllPaymentDetails = (Id) => {
    setLoader(true);
    getDetails(Id)
      .then((res) => {
        console.log(res?.data?.data, "uehyrueru");
        setViewHistory(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllPaymentDetails(Id);
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
      <div className="container-fluid pt-2 pb-5">
        <button className="btn btn-primary fs-5 d-flex align-items-center bg-main border border-none" onClick={() => navigate('/orderHistory')}><KeyboardBackspaceIcon className="" /></button>
        <h1 className="py-3">Order Details</h1>
        <div className={`w-100 pb-4 ${style.topBoxContainer}`}>
          <div className="border px-2 py-4">
            <div><b>Deliver to</b></div>
            <div>{viewHistory[0]?.address?.name}</div>
          </div>
          <div className="border px-2 py-4">
            <div><b>Contact Number</b></div>
            <div>{viewHistory[0]?.address?.mobile_number}</div>
          </div>
          <div className="border px-2 py-4">
            <div><b>Customer email</b></div>
            <div>{viewHistory[0]?.email}</div>
          </div>
          <div className="border px-2 py-4">
            <div><b>Delivery address</b></div>
            <div>{`${viewHistory[0]?.address?.house_number}, ${viewHistory[0]?.address?.city} ${viewHistory[0]?.address?.state},${viewHistory[0]?.address?.pincode}, ${viewHistory[0]?.address?.country}`}</div>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                  <b>Part Number</b>
                </TableCell>
                <TableCell >
                  <b>Product Name </b>
                </TableCell>
                <TableCell >
                  <b>Quantity </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {viewHistory[0]?.products.map((item) => (
                <TableRow className="text-capitalize" key={item.id}>
                  <TableCell
                    className={`border-0 ${style.tableText}`}
                  >
                    {item?.ke_partNumber[0]}
                  </TableCell>
                  <TableCell
                    className={` border-0 ${style.tableText}`}
                  >
                    {item?.productName[0]}
                  </TableCell>
                  <TableCell
                    className={`border-0 ${style.tableText}`}
                  >
                    {item?.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ViewOrderHistory;
