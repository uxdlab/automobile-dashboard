import React, { useState } from "react";
import "./Sidebar.css";
import { Menu } from "@mui/icons-material";
import { Backdrop, Box, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Triangle } from "react-loader-spinner";

export const Sidebar = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [containerToggel, setContainerToggel] = useState(false);
  const matches = useMediaQuery("(min-width:900px)");
  const [loader, setLoader] = useState(false);

  const sidebarData = [
    { text: "All Products", path: "/product" },
    { text: "Segment", path: "/segment" },
    { text: "Brand", path: "/brand" },
    { text: "Model", path: "/models" },
    { text: "Category", path: "/category" },
    { text: "Manufacturer", path: "/manufacture" },
  ];

  const containerData = [
    { text: "About Us", path: "/about-us" },
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Terms & Condition", path: "/term-condition" },
    { text: "Onboarding", path: "/on-boarding" },
  ];

  let navigate = useNavigate();
  console.log("ll");
  return (
    <>
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
      <div className="d-flex" style={{ height: "100%", width: "100%" }}>
        <div
          className="sidebar_main_con"
          style={{
            width: matches
              ? toggleSidebar
                ? "270px"
                : "0px"
              : !toggleSidebar
              ? "270px"
              : "0px",
          }}
        >
          <div className="align-center px-4 py-2" onClick={() =>{ navigate("/");}}>
            <img src="images/navbar_logo.png" className="w-100" alt="" />
            {/* Kapoor Enterprises */}
          </div>
          <div className="sidebar_item_con px-3">
            <Box
              onClick={() => navigate("/")}
              className="fs-5"
              sx={{ cursor: "pointer" }}
            >
              Customers
              <hr className="mb-3 mt-1" />
            </Box>
            <Box
              onClick={() => setToggle(!toggle)}
              className="fs-5"
              sx={{ cursor: "pointer" }}
            >
              <span className="d-flex justify-content-between align-items-center">
                <span>Product</span>{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    transition: "0.3s",
                    transform: toggle ? "rotate(180deg)" : "rotate(360deg)",
                  }}
                />
              </span>{" "}
              <hr className="mb-3 mt-1" />
            </Box>
            <Box
              sx={{
                padding: "0 0 0 20px",
                transition: "0.3s",
                overflow: "hidden",
                height: toggle ? "310px" : "0px",
              }}
            >
              {sidebarData.map((res, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => navigate(res.path)}
                    className="fs-5"
                    sx={{ cursor: "pointer" }}
                  >
                    {res.text} <hr className="mb-3 mt-1" />
                  </Box>
                );
              })}
            </Box>
            <Box
              onClick={() => navigate("/orders")}
              className="fs-5"
              sx={{ cursor: "pointer" }}
            >
              Payment Details <hr className="mb-3 mt-1" />
            </Box>
            <Box
              onClick={() => navigate("/promo-listing")}
              className="fs-5"
              sx={{ cursor: "pointer" }}
            >
              Promo <hr className="mb-3 mt-1" />
            </Box>
            <Box
              onClick={() => setContainerToggel(!containerToggel)}
              className="fs-5"
              sx={{ cursor: "pointer" }}
            >
              <span className="d-flex justify-content-between align-items-center">
                <span>Content</span>{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    transition: "0.3s",
                    transform: containerToggel
                      ? "rotate(180deg)"
                      : "rotate(360deg)",
                  }}
                />
              </span>
              <hr className="mb-3 mt-1" />
            </Box>
            <Box
              sx={{
                padding: "0 0 0 20px",
                transition: "0.3s",
                overflow: "hidden",
                height: containerToggel ? "310px" : "0px",
              }}
            >
              {containerData.map((item, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="fs-5"
                    sx={{ cursor: "pointer" }}
                  >
                    {item.text}
                    <hr className="mb-3 mt-1" />
                  </Box>
                );
              })}
            </Box>
          </div>
        </div>
        <div className="w-100">
          <div className="top_bar d-flex align-items-center justify-content-between">
            <span style={{ cursor: "pointer" }}>
              <Menu
                className="fs-1 ms-3"
                onClick={() => setToggleSidebar(!toggleSidebar)}
              />{" "}
              <i></i>
            </span>
            <Link
              style={{ textDecoration: "none" }}
              to={"/login"}
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
              }}
            >
              <span
                style={{ color: "white" }}
                onClick={() => {
                  localStorage.setItem("isLoggedIn", "false");
                }}
              >
                <h6 className="d-flex align-items-center pe-3 pt-2">
                  <LogoutIcon className="text-danger" />{" "}
                  <span> &nbsp;Logout</span>
                </h6>
              </span>
            </Link>
          </div>
          <div className="child_con">{children}</div>
        </div>
      </div>
    </>
  );
};
