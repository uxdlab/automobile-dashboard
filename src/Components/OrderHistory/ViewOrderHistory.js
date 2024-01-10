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
        <button className="btn btn-primary fs-5 d-flex align-items-center bg-main border border-none" onClick={()=>navigate('/orderHistory')}><KeyboardBackspaceIcon className=""/></button>
        <h1 className="py-3">View Order Details</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b>Deliver to</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Contact Number for delivery</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Customer email</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Delivery address</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Part Number</b>
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
              {viewHistory.map((item) => (
                <TableRow className="text-capitalize" key={item.id}>
                  <TableCell
                    className={`text-center border-0 ${style.tableText}`}
                  >
                    {item?.address?.name}
                  </TableCell>
                  <TableCell
                    className={`text-center border-0 ${style.tableText}`}
                  >
                    {item?.address?.mobile_number}
                  </TableCell>
                  <TableCell
                    className={`text-center border-0 ${style.tableText}`}
                  >
                    {item?.email}
                  </TableCell>
                  <TableCell
                    className={`text-center border-0 ${style.tableText}`}
                  >{`${item?.address?.house_number}, ${item?.address?.city} ${item?.address?.state},${item?.address?.pincode}, ${item?.address?.country}`}</TableCell>
                  <TableCell className="text-center">
                    {item?.products.map((productsRes, index) => (
                      <TableRow
                        key={index}
                        className={`text-center ${style.tableRows}`}
                      >
                        <TableCell
                          className={`text-center border-0 ${style.tableText}`}
                        >
                          {productsRes?.ke_partNumber[0]}
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.products.map((productsRes, index) => (
                      <TableRow
                        key={index}
                        className={`text-center ${style.tableRows}`}
                      >

                        <TableCell
                          className={`text-center border-0 ${style.tableText}`}
                        >
                          {productsRes?.productName[0]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>

                  <TableCell
                    className={`text-center border-0 ${style.tableText}`}
                  >
                    {item?.products.map((productsRes, index) => (
                      <TableRow
                        key={index}
                        className={`text-center ${style.tableRows}`}
                      >
                        <TableCell
                          className={`text-center border-0 ${style.tableText}`}
                        >
                          {productsRes?.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
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
