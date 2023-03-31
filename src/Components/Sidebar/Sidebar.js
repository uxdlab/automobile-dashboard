
import React, { useState } from "react";
import './Sidebar.css'




export const Sidebar = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(true)

    return (
        <>

            <div className="d-flex">

                <div className="sidebar_main_con" style={{ width: toggleSidebar ? '270px' : '0px' }}>
                    <div className="fs-1 align-center ps-3">LOGO</div>
                    <div className="sidebar_item_con fs-5 px-3">
                        <div>Vehicles</div>
                        <hr />
                        <div>Products</div>
                        <hr />
                        <div>Models</div>
                        <hr />
                        <div>Items</div>
                    </div>

                </div>
                <div className="w-100">
                    <div className="top_bar d-flex align-items-center">
                        <span style={{ cursor: 'pointer' }}>
                            <i onClick={() => setToggleSidebar(!toggleSidebar)} class="fa fa-bars fs-2 ms-3"></i>
                        </span>
                    </div>
                    <div>{children}</div>
                </div>


            </div>


        </>
    )
}