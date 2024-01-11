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
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { Triangle } from "react-loader-spinner";
import React, { useRef } from "react";
import { useState } from "react";
import { SnackBar } from "../Assets/SnackBar";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  addMechanic,
  updateMechanic,
  getAllMechanic,
  getMechanicId,
  deleteMechanic,
  isActive,
  resetPoint,
} from "../../services/MechanicApi";
import moment from "moment/moment";
import Pagination from "rc-pagination";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import "./Style.css";
import matchers from "@testing-library/jest-dom/matchers";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [searchValue, setSearchValue] = useState([]);

  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [collection, setCollection] = useState([]);
  const [allPromos, setAllPromos] = useState([]);
  const [MechanicId, setMechanicId] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [backUpData, setBackUpData] = useState([])
  const [isValidAdd, setIsValidAdd] = useState(false)
  const [isValidEdit, setIsValidEdit] = useState(false)

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allPromos.slice(from, to));
  };
  const updateMechanicByid = async (e) => {
    e.preventDefault();
    if (!isValidEdit) {
      setLoader(true)
      setOpen1(false);
      await updateMechanic(MechanicId, Mechanic.current).then((res) => {
        getAllData();
        setLoader(false)

        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Mechanic Updated successfully",
          type: "success",
        });
      }).catch(err => setLoader(false))
    }
  };
  const addMachincData = async (e) => {
    e.preventDefault();
    if (!isValidAdd) {
      setLoader(true)
      setOpen(false);
      await addMechanic(Mechanic.current).then((res) => {
        if (res?.response) {
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "The phone number or email address is already in active use.",
            type: "error",
          });
          setLoader(false)
        } else {

          setLoader(false)
          getAllData();
          ShowSnackbar({
            show: true,
            vertical: "top",
            horizontal: "right",
            msg: "Mechanic Added successfully",
            type: "success",
          });
        }
      }).catch((err) => setLoader(false))
    }
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
      let dd = [...res.data.data];
      let newData = dd.reverse()
      setCollection(newData);
      setSearchValue(newData);
      setBackUpData(newData);
      setLoader(false)
    }).catch(err => setLoader(false))
  };
  const pointReset = async (id) => {
    await resetPoint(id).then((res) => {
      getAllData();
    });
  };

  const searching = (e) => {
    let data = [...backUpData]
    let val = e.toLowerCase()
    let dd = data.filter(res => res.mechanic_name.toLowerCase().includes(val) || res.mechanic_number.toLowerCase().includes(val) || res.mechanic_email.toLowerCase().includes(val) || res.mechanic_address.toLowerCase().includes(val))
    setCollection(dd);
    setSearchValue(dd);
  }


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
                        if (Mechanic.current.mechanic_number.length !== 10) {
                          setIsValidAdd(true)
                        } else {
                          setIsValidAdd(false)
                        }
                      }}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                    />
                    <div className="text-danger" style={{ fontSize: '14px' }}>{isValidAdd ? 'Please Enter 10 Digits Phone Number' : ''}</div>
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
                    <div style={{ display: "flex" }}>
                      <input
                        type={showPass ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Enter Mechanic Password"
                        className="form-control w-100 mb-2"
                        onChange={(e) => {
                          Mechanic.current.password = e.target.value;
                        }}
                      />
                      <div className="passwordShow">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </div>
                    </div>
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
                        if (Mechanic.current.mechanic_number.length !== 10) {
                          setIsValidEdit(true)
                        } else {
                          setIsValidEdit(false)
                        }
                      }}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 10))
                      }
                    />
                    <div className="text-danger" style={{ fontSize: '14px' }}>{isValidEdit ? 'Please Enter 10 Digits Phone Number' : ''}</div>
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
                placeholder="Search Here By Name, Email, Phone, Address"
                onChange={(e) => {
                  if (e.target.value == ' ') {
                    e.target.value = ''
                  } else {
                    searching(e.target.value);
                  }
                }}
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
                  <b>Retailer</b>
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
              {searchValue.map((res, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {res.mechanic_email}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_number}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.mechanic_address}
                    </TableCell>
                    <TableCell className="text_cap text-center">
                      {res.retailer ? res.retailer : "--No Retailer--"}
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
                          setLoader(true)
                          await deleteMechanic(res._id).then((res) => {
                            ShowSnackbar({
                              show: true,
                              vertical: "top",
                              horizontal: "right",
                              msg: "Mechanic Deleted successfully",
                              type: "success",
                            });
                            getAllData()
                            setLoader(false)
                          }
                          ).catch((err) => setLoader(false))
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
