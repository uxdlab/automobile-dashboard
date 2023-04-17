
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";

export const BrandListing = () => {

    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allCompanies, setCompanies] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '' })
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [id, setId] = useState('')
    let brandData = useRef({ brand_name: '' })
    useEffect(() => {
        getAllCompany()
    }, [])
    function getAllCompany() {
        CompanyClass.getAllCompany()
            .then(res => {
                setLoader(false)
                setCompanies(res.data.data)
                console.log(res.data.data)
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

    async function addBrand(e) {
        e.preventDefault()
        console.log(brandData.current)
        setLoader(true)
        setOpen(false)
        CompanyClass.addCompany(brandData.current)
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllCompany()
            }).catch((err) => {
                console.log(err)
                getAllCompany()
            })

    }

    async function updateBrand(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        CompanyClass.editCompany(id, brandData.current)
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllCompany()
            }).catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }

    async function getBrandById(idd) {
        setLoader(true)
        setId(idd)
        CompanyClass.getCompany(idd)
            .then((res) => {
                console.log(res)
                brandData.current = res.data.data[0]
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
                setLoader(false)
                
            })
    }

    return (
        <>
         {/* Delete Dialog Box */}
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

            {/* Add Brand Dialog Box */}
                <Dialog
                    open={open}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Add Brand</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Brand Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                {/* <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                  
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div> */}
                        </div>

                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={addBrand}>Add</Button>
                        </Box>
                    </Box>

                </Dialog>

                {/* Edit Brand Dialog Box */}
                <Dialog
                    open={open1}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Edit Brand</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Brand Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} defaultValue={brandData.current.brand_name} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                {/* <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                  
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div> */}
                        </div>

                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() => setOpen1(false)}>Cancel</Button>
                            <Button variant="contained" onClick={updateBrand}>Update</Button>
                        </Box>
                    </Box>

                </Dialog>



            <h1 className="mt-2 fs-2 mx-3">Brands</h1>

            <Box align='right' className='px-3 pb-3'>
                    <Button className="btn_primary" onClick={() => setOpen(true)}  variant="contained">Add Brand</Button>
            </Box>
            <div className="px-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Sno.</b></TableCell>
                            <TableCell><b>Brand Name</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCompanies.map((res, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.brand_name}</TableCell>
                                    <TableCell>
                                        <Delete onClick={() => {
                                            setDeletedComp({ id: res._id, index })
                                            setDeleteModel(true)
                                        }} />
                                        <Edit onClick={() => 
                                            getBrandById(res._id)} />
                                        {/* <RemoveRedEye sx={{cursor:'pointer'}}
                                        onClick={()=>{
                                            navigate('/viewBrand')
                                        }}
                                        /> */}

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
