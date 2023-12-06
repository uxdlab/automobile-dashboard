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
} from "@mui/material";
import { gerAllPayment } from "../../services/Payment";

const ViewOrderHistory = () => {
  const [selectedPayment, setSelectedPayment] = useState([]);
  const { Id } = useParams();

  const getAllPaymentDetails = () => {
    gerAllPayment()
      .then((res) => {
        console.log(res.data.data);

        const selectedPaymentData = res.data.data.find(
          (payment) => payment._id === Id
        );

        if (selectedPaymentData) {
          setSelectedPayment(selectedPaymentData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPaymentDetails();
  }, []);

  console.log(selectedPayment, "chck");
  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <h1 className="px-2"> View Order History</h1>
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
    </>
  );
};

export default ViewOrderHistory;
