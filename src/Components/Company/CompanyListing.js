
import { Backdrop, Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";

export const CompanyListing = () => {

    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allCompanies, setCompanies] = useState([])

    useEffect(() => {
        getAllCompany()
    }, [])
    function getAllCompany() {
        CompanyClass.getAllCompany()
            .then(res => {
                setLoader(false)
                setCompanies(res.data.data)
            })
    }


    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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

            <div className="mt-2 fs-2 text-center">Companies</div>

            <Box align='right' className='p-3'>
                <Link style={{ textDecoration: 'none' }} to='/addCompany'>
                    <Button className="btn_primary" variant="contained">Add Company</Button>
                </Link>
            </Box>
            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sno.</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCompanies.map((res, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.company_name}</TableCell>
                                    <TableCell>
                                        <Delete />
                                        <Edit onClick={() => navigate(`/editCompany/${res._id}`)} />
                                        <RemoveRedEye />

                                    </TableCell>
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </div>

        </>
    )
}
