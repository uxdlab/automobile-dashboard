import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
export const VehicleListing = () => {


    return (
        <>
            <div className="mt-2 fs-2 text-center">Vehicle</div>

            <Box align='right' className='px-3'>
                <Link style={{ textDecoration: 'none' }} to='/addVehicle'>
                    <Button className="btn_primary" variant="contained">Add Vehicle</Button>
                </Link>
            </Box>

            <div className="p-3">

                <table className="table border">
                    <thead>
                        <tr>
                            <th scope="col">Sno.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>2-Vehicles</td>
                            <th>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <i className="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>3-Vehicles</td>
                            <td>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <i className="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>22-Vehicles</td>
                            <th>
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                <i className="mx-2 fa fa-pencil-square-o" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>


        </>
    )
}