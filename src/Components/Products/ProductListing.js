
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ProductClass } from "../../services/Product";

export const ProductListing = () => {

    const [loader, setLoader] = useState(false)
    const [deleteModel, setDeleteModel] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [deletedVeh, setDeletedVeh] = useState({ id: '', index: '' })
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
            .catch(err => console.log(err))
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


            <div className="mt-2 fs-2 text-center">Products</div>

            <Box align='right' className='px-3'>
                <Link style={{ textDecoration: 'none' }} to='/addProduct'>
                    <Button className="btn_primary" variant="contained">Add Product</Button>
                </Link>
            </Box>

            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Sno.</b></TableCell>
                            <TableCell><b>Product name</b></TableCell>
                            <TableCell><b>Icon</b></TableCell>
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
                                        <TableCell>{res.product_icon}</TableCell>
                                        <TableCell>
                                            <Delete onClick={() => {
                                                setDeletedVeh({ id: res._id, index })
                                                setDeleteModel(true)
                                            }} />
                                            <Edit onClick={() => navigate(`/editProduct/${res._id}`)} />
                                            <RemoveRedEye onClick={() => navigate(`/viewProduct/${res._id}`)} />
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
