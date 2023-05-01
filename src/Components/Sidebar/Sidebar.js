
import React, { useState } from "react";
import './Sidebar.css'
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "../Login/LoginPage";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Sidebar = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true)
    const [toggle,setToggle] = useState(false)

    const sidebarData = [
        { text: 'All Products', path: '/product' },
        { text: 'Segment', path: '/' },
        { text: 'Brand', path: '/brand' },
        { text: 'Model', path: '/models' },
        { text: 'Category', path: '/category' },
        { text: 'Manufacture', path: '/manufacture' },
    ]

    let navigate = useNavigate()
    console.log('ll')
    return (
        <>
       
                <div className="d-flex" style={{ height: '100%', width: '100%' }}>
                    <div className="sidebar_main_con" style={{ width: toggleSidebar ? '270px' : '0px' }}>
                        <div className="align-center px-2">
                            <img src="images/navbar_logo.png" className="w-100" alt=''/>
                            {/* Kapoor Enterprises */}
                        </div>
                        <div className="sidebar_item_con px-3">
                        <Box onClick={() => navigate('/users')} className="fs-5" sx={{ cursor: 'pointer' }}>Users  <hr className="mb-3 mt-1" /></Box>
                        <Box onClick={() => setToggle(!toggle) } className="fs-5" sx={{ cursor: 'pointer' }}><span className="d-flex justify-content-between align-items-center"><span>Product</span> <KeyboardArrowDownIcon sx={{transition:'0.3s',transform:toggle?'rotate(180deg)':'rotate(360deg)'}}/></span> <hr className="mb-3 mt-1" /></Box>
                           <Box sx={{padding:'0 0 0 20px',transition:'0.3s',overflow:'hidden',height: toggle ? '310px': '0px'}}>
                           {sidebarData.map((res, index) => {
                                return (

                                    <Box key={index} onClick={() => navigate(res.path)} className="fs-5" sx={{ cursor: 'pointer' }}>{res.text}  <hr className="mb-3 mt-1" /></Box>

                                )
                            })}
                           </Box>
                            <Box onClick={() => navigate('/orders')} className="fs-5" sx={{ cursor: 'pointer' }}>Orders  <hr className="mb-3 mt-1" /></Box>

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
              
        </>
    )
}