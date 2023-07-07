import React, { useEffect, useState } from "react";
import "./Style.css";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "rc-pagination";
import { getAllUsers, activeUser, deleteUsers } from "../../services/Users";
import { SnackBar } from "../Assets/SnackBar";
import { Delete, Edit } from "@mui/icons-material";
import { Triangle } from "react-loader-spinner";

export default function UsersListing() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [value, setValue] = React.useState("");
  const [collection, setCollection] = React.useState(
    allUsers.slice(0, countPerPage)
  );
  const [snackbar, ShowSnackbar] = useState({
    show: false,
    vertical: "top",
    horizontal: "right",
    msg: "data added",
    type: "error",
  });
  const [deleteModel, setDeleteModel] = useState(false);
  const [loader, setLoader] = useState(false);
  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [value, countPerPage, allUsers]);

  const getUsers = () => {
    setLoader(true);
    getAllUsers()
      .then((res) => {
        setAllUsers(res.data.data);
        console.log(res.data.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };
  const active = (userId) =>
    activeUser(userId).then((res) => {
      console.log("okok");
    });

  useEffect(() => {
    getUsers();
  }, []);
  const deleteusers = (id) => {
    setLoader(true);

    deleteUsers(id)
      .then((res) => {
        console.log(res);
        setLoader(false);

        getUsers();
        ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Customer  Deleted successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(allUsers.slice(from, to));
  };
  return (
    <>
      <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <Dialog open={deleteModel} maxWidth={"sm"} fullWidth={true}>
          <Box p={3}>
            <Box>Are you sure you want to delete?</Box>
            <Box align="right">
              <Button
                className="cancel_btn me-3"
                onClick={() => setDeleteModel(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="custom-btn"
                onClick={deleteusers}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Dialog>
        <div
        // style={{ display: "flex", justifyContent: "center", marginTop: "" }}
        >
          <Triangle
            height="80"
            width="80"
            color="black"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={loader}
          />
        </div>
      </Backdrop>
      <div class="container-fluid">
        <div class="col mt-2 d-flex justify-content-between">
          <h1 class="d-inline-block">Customers</h1>
        </div>
      </div>
      <Box sx={{ mx: 2 }} className="border">
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell className="w-12"><b>S.No</b></TableCell> */}
              <TableCell className="w-25">
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Phone No.</b>
              </TableCell>
              <TableCell>
                <b>Active</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collection.map((res, index) => {
              return (
                <TableRow key={index}>
                  {/* <TableCell>{index + 1}</TableCell> */}
                  <TableCell className="text_cap">{res.fullName}</TableCell>
                  <TableCell>{res.email}</TableCell>
                  <TableCell>{res.mobile_number}</TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={res.user_login}
                      onChange={() => active(res._id)}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <RemoveRedEye  /> */}
                    <Delete
                      className="pointer"
                      onClick={(e) => deleteusers(res._id)}
                    />
                    &nbsp;&nbsp;
                    {/* <Edit className="pointer" /> */}
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
            total={allUsers.length}
            style={{ color: "green" }}
          />
        </Box>
      </Box>
    </>
  );
}
