
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";

export const CompanyListing = () => {

    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allCompanies, setCompanies] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '' })
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
    function deleteCompany() {
        setDeleteModel(false)
        setLoader(true)
        console.log(deletedComp)
        CompanyClass.deleteCompany(deletedComp.id)
            .then(res => {
                let arr = [...allCompanies]
                arr.splice(deletedComp.index, 1)
                setCompanies(arr)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Dialog
                open={deleteModel}
                maxWidth={'sm'}
                fullWidth={true}
            >
                <Box p={3}>
                    <Box>Are you sure you want to delete?</Box>
                    <Box align='right'>
                        <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                        <Button variant="contained" onClick={deleteCompany}>Delete</Button>
                    </Box>
                </Box>

            </Dialog>
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
                                        <Delete onClick={() => {
                                            setDeletedComp({ id: res._id, index })
                                            setDeleteModel(true)
                                        }} />
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
