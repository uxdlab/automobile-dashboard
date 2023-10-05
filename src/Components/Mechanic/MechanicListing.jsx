import {
  Backdrop,
  Box,
  Button,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  TableBody,
  Switch,
} from "@mui/material";
import { Triangle } from "react-loader-spinner";
import React, { useRef } from "react";
import { useState } from "react";
import { SnackBar } from "../Assets/SnackBar";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  addMechanic,
  updateMechanic,
  getAllMechanic,
  getMechanicId,
  deleteMechanic,
  isActive,
  resetPoint
} from "../../services/MechanicApi";
import moment from "moment/moment";
import Pagination from "rc-pagination";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import "./Style.css";
import matchers from "@testing-library/jest-dom/matchers";

export default function MechanicListing() {
  const Mechanic = useRef({
    mechanic_name: "",
    mechanic_number: "",
    mechanic_email: "",
    mechanic_address: "",
    password: "",
  });
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [searchValue, setSearchValue] = useState("");

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [collection, setCollection] = useState([]);
  const [allPromos, setAllPromos] = useState([]);
  const [MechanicId, setMechanicId] = useState("");

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allPromos.slice(from, to));
  };
  const updateMechanicByid = async (e) => {
    e.preventDefault();

    await updateMechanic(MechanicId, Mechanic.current).then((res) => {
      getAllData();
      setOpen1(false);
    });
  };
  const addMachincData = async (e) => {
    console.log(Mechanic.current);
    e.preventDefault();
    await addMechanic(Mechanic.current).then((res) => getAllData());
  };
  const getMechanic = (id) => {
    Mechanic.current = {
      mechanic_name: "",
      mechanic_number: "",
      mechanic_email: "",
      mechanic_address: "",
      password: "",
    };
    setMechanicId(id);
    getMechanicId(id).then((res) => {
      Mechanic.current = res.data.data;
      setOpen1(true);
    });
  };
  const getAllData = async () => {
    await getAllMechanic().then((res) => {
      setCollection(res.data.data);
    });
  };
  const pointReset = async (id) => {
    await resetPoint(id).then((res) => {
      getAllData()
    });
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <Box sx={{ width: "100%" }} px={2}>
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
        <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Add Mechanic</h5>
            <hr />
            <form onSubmit={(e) => addMachincData(e)}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span> Mechanic Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Mechanic Name"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        Mechanic.current.mechanic_name = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Email</b>
                      </small>
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Enter Mechanic Email"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        Mechanic.current.mechanic_email = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Phone Number:</b>
                      </small>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Enter Mechanic Phone Number"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        Mechanic.current.mechanic_number = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Address:</b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Mechanic Address"
                      className="form-control w-100 mb-2"
                      autoComplete="new-address"
                      onChange={(e) => {
                        Mechanic.current.mechanic_address = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Password:</b>
                      </small>
                    </div>
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Enter Mechanic Password"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        Mechanic.current.password = e.target.value;
                      }}
                    />
                  </div>
                  <Box align="right" className="mt-3">
                    <span
                      className="btn cancel_btn me-3 py-1 px-3"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </span>
                    <button className="btn custom-btn py-1 px-3" type="submit">
                      Add Mechanic
                    </button>
                  </Box>
                </div>
              </div>
            </form>
          </Box>
        </Dialog>
        <Dialog open={open1} maxWidth={"xs"} fullWidth={true}>
          <Box py={2} px={1} className="over-flow-hide-x">
            <h5 className="px-3">Edit Mechanic</h5>
            <hr />
            <form onSubmit={(e) => updateMechanicByid(e)}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b>
                          <span className="text-danger">*</span> Mechanic Name:
                        </b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Mechanic Name"
                      className="form-control w-100 mb-2"
                      defaultValue={Mechanic.current.mechanic_name}
                      onChange={(e) => {
                        if (e.target.value.trim() == "") {
                          e.target.value = "";
                        } else {
                          Mechanic.current.mechanic_name = e.target.value;
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Email</b>
                      </small>
                    </div>

                    <input
                      type="email"
                      required
                      defaultValue={Mechanic.current.mechanic_email}
                      placeholder="Enter Mechanic Email"
                      className="form-control w-100 mb-2"
                      onChange={(e) => {
                        Mechanic.current.mechanic_email = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Phone Number:</b>
                      </small>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Enter Mechanic Phone Number"
                      className="form-control w-100 mb-2"
                      defaultValue={Mechanic.current.mechanic_number}
                      onChange={(e) => {
                        Mechanic.current.mechanic_number = e.target.value;
                      }}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Address:</b>
                      </small>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Mechanic Address"
                      className="form-control w-100 mb-2"
                      autoComplete="new-address"
                      defaultValue={Mechanic.current.mechanic_address}
                      onChange={(e) => {
                        Mechanic.current.mechanic_address = e.target.value;
                      }}
                    />
                  </div>
                  {/* <div className="col-md-12">
                    <div className="py-2">
                      <small>
                        <b> Mechanic Password:</b>
                      </small>
                    </div>
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Enter Mechanic Password"
                      className="form-control w-100 mb-2"
                      defaultValue={Mechanic.current.password}
                      onChange={(e) => {
                        Mechanic.current.password = e.target.value
                      }}
                    />
                  </div> */}
                  <Box align="right" className="mt-3">
                    <span
                      className="btn cancel_btn me-3 py-1 px-3"
                      onClick={() => {
                        setOpen1(false);
                      }}
                    >
                      Cancel
                    </span>
                    <button className="btn custom-btn py-1 px-3" type="submit">
                      Update
                    </button>
                  </Box>
                </div>
              </div>
            </form>
          </Box>
        </Dialog>
        <h1>Mechanic</h1>
        <Box className="pb-3 d-flex justify-content-between">
          <Grid container>
            <Grid item md={6} xs={12}>
              <input
                className="w-75 form-control"
                type="search"
                placeholder="Search"
                onChange={(e) => {}}
              />
            </Grid>
            <Grid item md={6} xs={12} className="d-flex justify-content-end">
              <Button
                className="btn_primary"
                align=""
                variant="contained"
                onClick={() => setOpen(true)}
              >
                Add Mechanic
              </Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table className="border">
            <TableHead>
              <TableRow>
                <TableCell className="text-center">
                  <b>Name</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Email</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Phone Number</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Address</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Point</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Redeem Required</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Active</b>
                </TableCell>
                <TableCell className="text-center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection.map((res, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_name}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_email}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_number}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_address}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.points}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.redeem !== "no" ? res.redeem : "--No Request--"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        defaultChecked={res.is_loggedIn}
                        onChange={async () => await isActive(res._id)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Delete
                        className="pointer"
                        onClick={async (e) => {
                          await deleteMechanic(res._id).then((res) =>
                            getAllData()
                          );
                        }}
                      />
                      <Edit
                        className="pointer"
                        onClick={() => {
                          console.log(res);
                          getMechanic(res._id);
                        }}
                      />
                      <RestartAltIcon
                      className="pointer"
                      onClick={() => {
                        
                        pointReset(res._id);
                      }}
                      />
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
              // total={allPromos.length}
              style={{ color: "green" }}
            />
          </Box>
        </TableContainer>
      </Box>
    </>
  );
}
