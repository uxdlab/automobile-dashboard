
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ProductClass } from "../../services/Product";

export const Category = () => {

    const [loader, setLoader] = useState(false)
    const [deleteModel, setDeleteModel] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [deletedVeh, setDeletedVeh] = useState({ id: '', index: '' })
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [id, setId] = useState('')
    const allCategory = useRef([
        {
            product_name: ''
        }
    ])
    let navigate = useNavigate()

    useEffect(() => {
        getAllProducts()
    }, [])
    async function getAllProducts() {
        setLoader(true)
        ProductClass.getAllProducts()
            .then((res) => {
                setAllProducts(res.data.data)
                setLoader(false)
                console.log(res.data.data)

            })
            .catch(err => {
                setLoader(false)
                console.log(err)})
    }
    function deleteProduct() {
        setLoader(true)
        setDeleteModel(false)
        ProductClass.deleteProduct(deletedVeh.id)
            .then(res => {
                console.log(res)
                let arr = [...allProducts]
                arr.splice(deletedVeh.index, 1)
                setAllProducts(arr)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }

    async function addCategory(e) {
        e.preventDefault()
        console.log(allCategory.current[0])
        setLoader(true)
        setOpen(false)
        ProductClass.addProduct(allCategory.current[0])
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllProducts()
            }).catch((err) => {
                console.log(err)
                getAllProducts()
            })

    }

    async function updateCategory(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        ProductClass.editProduct(id, allCategory.current[0])
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllProducts()
            }).catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }

    async function getCategoryById(idd) {
        setLoader(true)
        setId(idd)
        ProductClass.getProduct(idd)
            .then((res) => {
                console.log(res)
                allCategory.current[0] = res.data.data
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
                setLoader(false)
                
            })
    }


    return (
        <Box>
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
            <Dialog
                open={deleteModel}
                maxWidth={'sm'}
                fullWidth={true}
            >
                <Box p={3}>
                    <Box>Are you sure you want to delete?</Box>
                    <Box align='right'>
                        <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                        <Button variant="contained" onClick={deleteProduct}>Delete</Button>
                    </Box>
                </Box>

            </Dialog>

             {/* Add Brand Dialog Box */}
             <Dialog
                    open={open}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Add Category</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Category Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => allCategory.current[0].product_name = e.target.value} placeholder="Enter Category Name" className="form-control w-100 mb-2" />
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
                            <Button variant="contained" onClick={addCategory}>Add</Button>
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
                        <Typography variant="h5" className="text-center mb-2">Edit Category</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Category Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => allCategory.current[0].product_name = e.target.value} defaultValue={allCategory.current[0].product_name} placeholder="Enter Category Name" className="form-control w-100 mb-2" />
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
                            <Button variant="contained" onClick={updateCategory}>Update</Button>
                        </Box>
                    </Box>

                </Dialog>


            <h1 className="mt-2 fs-2 mx-3">Category</h1>
            <Box align='right' className='px-3'>
                    <Button className="btn_primary" onClick={()=>setOpen(true)} variant="contained">Add Category</Button>
            </Box>

            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>S.No.</b></TableCell>
                            <TableCell><b>Category name</b></TableCell>
                            {/* <TableCell><b>Icon</b></TableCell> */}
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allProducts.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{res.product_name}</TableCell>
                                        {/* <TableCell>{res.product_icon}</TableCell> */}
                                        <TableCell>
                                            <Delete sx={{ cursor: 'pointer' }} onClick={() => {
                                                setDeletedVeh({ id: res._id, index })
                                                setDeleteModel(true)
                                            }} />
                                            <Edit sx={{ cursor: 'pointer' }} onClick={() =>getCategoryById(res._id)} />
                                            {/* <RemoveRedEye sx={{ cursor: 'pointer' }} onClick={() => navigate(`/viewProduct/${res._id}`)} /> */}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </Box >
    )
}
