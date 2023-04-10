
import React, { useState } from "react";
import './Sidebar.css'
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "../Login/LoginPage";

export const Sidebar = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true)

    const sidebarData = [
        { text: 'Segment', path: '/' },
        { text: 'Brand', path: '/brand' },
        { text: 'Model', path: '/models' },
        { text: 'Category', path: '/category' },
        { text: 'Product', path: '/product' },
        { text: 'Users', path: '/users' },
        { text: 'Orders', path: '/oredrs' },
    ]

    let navigate = useNavigate()
    console.log('ll')
    return (
        <>
            {localStorage.getItem("isLoggedIn") ?
                <div className="d-flex" style={{ height: '100%', width: '100%' }}>
                    <div className="sidebar_main_con" style={{ width: toggleSidebar ? '270px' : '0px' }}>
                        <div className="fs-1 align-center ps-3">LOGO</div>
                        <div className="sidebar_item_con px-3">
                            {sidebarData.map((res, index) => {
                                return (

                                    <Box key={index} onClick={() => navigate(res.path)} className="fs-5" sx={{ cursor: 'pointer' }}>{res.text}  <hr className="mb-3 mt-1" /></Box>

                                )
                            })}

                        </div>

                    </div>
                    <div className="w-100">
                        <div className="top_bar d-flex align-items-center justify-content-between">
                            <span style={{ cursor: 'pointer' }}>
                                <Menu className="fs-1 ms-3" onClick={() => setToggleSidebar(!toggleSidebar)} /> <i  ></i>
                            </span>
                            <Link
                                style={{ textDecoration: "none" }}
                                to={"/login"}
                                onClick={() => {
                                    localStorage.removeItem("isLoggedIn");
                                }}
                            >
                                <span style={{ color: 'white', padding: '0 20px' }} onClick={() => {
                                    localStorage.setItem("isLoggedIn", "false");

                                }}>logout</span>
                            </Link>
                        </div>
                        <div className="child_con">{children}</div>
                    </div>
                </div>
                : <LoginPage />}
        </>
    )
}