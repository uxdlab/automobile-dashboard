import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { getAllItem } from '../../services/Item';
import { deleteItem } from '../../services/Item';
import { SnackBar } from '../Assets/SnackBar';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export default function ProductListing() {
    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allProduct, setAllProduct] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', images: [] })
    const [snackbar, ShowSnackbar] = useState({
        show: false,
        vertical: "top",
        horizontal: "right",
        msg: "data added",
        type: "error",
    });
    useEffect(() => {
        getAllProduct()
        if (sessionStorage.getItem('updated') == 'true') {
            ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Product Updated successfully",
                type: "success",
            });
            sessionStorage.removeItem('updated')
        }
        if (sessionStorage.getItem('added') == 'true') {
            ShowSnackbar({
                show: true,
                vertical: "top",
                horizontal: "right",
                msg: "Product Added successfully",
                type: "success",
            });
            sessionStorage.removeItem('added')
        }
    }, [])
    function getAllProduct() {
        getAllItem().then((res) => {
            console.log(res)
            setLoader(false)
            setAllProduct(res.data.data)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
        
    }
    function deleteProduct() {
        setDeleteModel(false)
        setLoader(true)
        console.log(deletedComp.id)
        deleteItem(deletedComp.id)
            .then(res => {
                console.log(res)
                setLoader(false)
                getAllProduct()
                ShowSnackbar({
                    show: true,
                    vertical: "top",
                    horizontal: "right",
                    msg: "Product Deleted successfully",
                    type: "success",
                });
                console.log(deletedComp.images)
               if(deletedComp.images.length!==0){
                deletedComp.images.map((item)=>{
                    const storage = getStorage();
                    const desertRef = ref(storage, item);
                    deleteObject(desertRef)
                        .then(() => {
                            console.log("image deleted");
                        }).catch((err) => { })
                    })
               }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
            <Dialog
                open={deleteModel}
                maxWidth={'sm'}
                fullWidth={true}
            >
                <Box p={3}>
                    <Box>Are you sure you want to delete?</Box>
                    <Box align='right'>
                        <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                        <Button variant="contained" className="custom-btn" onClick={deleteProduct}>Delete</Button>
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

            <h1 className="mt-2 fs-2 mx-3">Products</h1>

            <Box align='right' className='px-3 pb-3'>
                <Link style={{ textDecoration: 'none' }} to='/addProduct'>
                    <Button className="btn_primary" variant="contained">Add Product</Button>
                </Link>
            </Box>
            <div className="px-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell><b>Sno.</b></TableCell> */}
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
                                    {/* <TableCell>{index + 1}</TableCell> */}
                                    <TableCell sx={{textTransform:'capitalize'}}>{res.product_name}</TableCell>
                                    <TableCell>{res.oe_reference_number}</TableCell>
                                    <TableCell>{res.ke_partNumber}</TableCell>
                                    <TableCell>{res.MRP}</TableCell>
                                    {/* <TableCell>{res.sparePart_description}</TableCell> */}
                                    <TableCell>
                                        <Delete onClick={() => {
                                            setDeletedComp({ id: res._id, images: res.image })
                                            setDeleteModel(true)
                                        }} />
                                        <Edit onClick={() => navigate(`/updateProduct/${res._id}`)} />
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
