import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { getAllItem } from '../../services/Item';

export default function ProductListing() {
    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allProduct, setAllProduct] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '' })
    useEffect(() => {
        getAllProduct()
    }, [])
    function getAllProduct() {
        getAllItem().then((res)=>{
            setLoader(false)
            setAllProduct(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    // function deleteCompany() {
    //     setDeleteModel(false)
    //     setLoader(true)
    //     console.log(deletedComp)
    //     CompanyClass.deleteCompany(deletedComp.id)
    //         .then(res => {
    //             let arr = [...allCompanies]
    //             arr.splice(deletedComp.index, 1)
    //             setCompanies(arr)
    //             setLoader(false)
    //         })
    //         .catch(err => console.log(err))
    // }

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
                        {/* <Button variant="contained" onClick={deleteCompany}>Delete</Button> */}
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

            <div className="mt-2 fs-2 mx-3">Products</div>

            <Box align='right' className='p-3'>
                <Link style={{ textDecoration: 'none' }} to='/addProduct'>
                    <Button className="btn_primary" variant="contained">Add Product</Button>
                </Link>
            </Box>
            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Sno.</b></TableCell>
                            <TableCell><b>Product Name</b></TableCell>
                            <TableCell><b>Product OE Reference Number</b></TableCell>
                            <TableCell><b>Product KE Part Number</b></TableCell>
                            <TableCell><b>Product MRP</b></TableCell>
                            {/* <TableCell><b>Product Description</b></TableCell> */}
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProduct.map((res, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.spare_partname}</TableCell>
                                    <TableCell>{res.oe_reference_number}</TableCell>
                                    <TableCell>{res.ke_partNumber}</TableCell>
                                    <TableCell>{res.MRP}</TableCell>
                                    {/* <TableCell>{res.sparePart_description}</TableCell> */}
                                    <TableCell>
                                        <Delete onClick={() => {
                                            // setDeletedComp({ id: res._id, index })
                                            setDeleteModel(true)
                                        }} />
                                        <Edit onClick={() => navigate(`/updateProduct/${res._id}`)} />
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
