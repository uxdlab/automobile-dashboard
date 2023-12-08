import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ViewOrderHistory = () => {
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const { Id } = useParams();

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

  console.log(viewHistory, "chck");
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
      <div style={{ maxWidth: "100%" }}>
        <h1 className="px-4 py-3"> View Order History</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b> Customer email</b>
                </TableCell>
                <TableCell className="text-center text-capitalize">
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
              {viewHistory.map((item) => (
                <TableRow className="text-capitalize" key={item.id}>
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
                          {productsRes.productName[0]}
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
