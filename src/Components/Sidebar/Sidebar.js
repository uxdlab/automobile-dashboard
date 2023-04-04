
import React, { useState } from "react";
import './Sidebar.css'
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true)

    const sidebarData = [
        { text: 'Vehicle', path: '/' },
        { text: 'Product', path: '/products' },
        { text: 'Company', path: '/company' },
        { text: 'Model', path: '/models' },
        { text: 'Items', path: '/items' },
    ]

    let navigate = useNavigate()
    return (
        <>

            <div className="d-flex" style={{ height: '100%' }}>

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
                    <div className="top_bar d-flex align-items-center">
                        <span style={{ cursor: 'pointer' }}>
                            <Menu className="fs-1 ms-3" onClick={() => setToggleSidebar(!toggleSidebar)} /> <i  ></i>
                        </span>
                    </div>
                    <div className="child_con">{children}</div>
                </div>


            </div>


        </>
    )
}