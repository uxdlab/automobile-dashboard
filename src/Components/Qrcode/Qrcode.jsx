import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Backdrop } from "@mui/material";
import "./Qrcode.css";
import { Dialog, Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import QRGenerator from "./QRGenerator";
import { Triangle } from "react-loader-spinner";
import { createPoint, allPoint } from "../../services/MechanicApi";
import { useEffect } from "react";
import moment from "moment/moment";
import QRCode from "qrcode";
export const Qrcode = () => {
  const [open, setOpen] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const [pointData, setPointData] = React.useState([]);
  const [loader, setLoader] = useState(true);
  const [showError, setShowError] = useState(false);

  const [denomination, setDenomination] = React.useState(""); // State variable for Denomination
  const [copies, setCopies] = React.useState(""); // State variable for Generate Copies
  const qrCodeData = [
    { id: 1234, value: "TEST1" },
    { id: 1235, value: "TEST2" },
  ];
  const qrCodeIds = qrCodeData.map((data) => data.id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {

  setLoader(true);
  
  let QrData = [];
  let pointCode = [];
  for (let i = 0; i < Number(copies); i++) {
    let id = uuidv4();
    QrData.push({
      point_id: id,
      denomination: denomination,
      });
      pointCode.push(id);
    }
    setOpen(false);
    await createPoint({
      denomination: denomination,
      point_ids: pointCode,
      copies: Number(copies),
    }).then((e) => allData());
    QRGenerator(QrData);
    setDenomination("");
    setCopies("");
    setLoader(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    background: "white",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };
  const allData = async () => {
    await allPoint().then((res) => {
      let dd = [...res.data.data];
      console.log(dd);
      setPointData(dd.reverse());
      setLoader(false);
    });
  };
  useEffect(() => {
    allData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 main-container">
            <Button
              className="btn_primary mt-2 mb-3"
              variant="contained"
              onClick={handleOpen}
            >
              ADD QR
            </Button>
          </div>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
        <Modal
          open={open}
          onClose={handleClose}
          maxWidth={"xs"}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="p-4" style={style}>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="denomination">Denomination</label>
                <input
                  type="number"
                  size={40}
                  className="form-control"
                  value={denomination}
                  onChange={(e) => setDenomination(e.target.value)} // Update Denomination state
                />
                <br />
                <label className="pt-4">Generate Copies</label>
                <input
                  type="number"
                  className="form-control"
                  value={copies}
                  onChange={(e) => {
                    setCopies(e.target.value)
                    if(Number(e.target.value) > 50){
                      setShowError(true)
                    }else{
                      setShowError(false)
                    }
                  }} // Update Generate Copies state
                />
                {  showError && <small className="text-danger">You can generate only 50 QR codes at a time</small>}

                <div className="create mt-4 h justify-content-end">
                  <Button
                    className="btn_primary mt-3"
                    variant="contained"
                    onClick={handleCreate}
                    disabled={showError}
                  >
                    print
                  </Button>
                  <Button
                    className="btn cancel_btn ms-4 mt-3"
                    variant=""
                    onClick={handleClose}
                    
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="text-center">
                <TableCell>
                  <b>Denomination</b>
                </TableCell>
                <TableCell>
                  <b>Generated Copies</b>
                </TableCell>
                <TableCell>
                  <b>Created Date</b>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead>
                <TableRow className='text-center'>
                  <TableCell><b>Denomination</b></TableCell>
                  <TableCell><b>Generated Copies</b></TableCell>
                  <TableCell><b>Created Date</b></TableCell>
                </TableRow>
              </TableHead> */}
            <TableBody>
              {pointData.map((res) => (
                <TableRow className="text-center">
                  <>
                    <TableCell>{res.denomination}</TableCell>
                    <TableCell className="text-center">{res.copies}</TableCell>
                    <TableCell className="text-center">
                      {moment(res.created_at).format("DD/MM/YYYY")}
                    </TableCell>
                  </>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
