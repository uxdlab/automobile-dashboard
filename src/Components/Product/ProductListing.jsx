import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { getAllItem, bulkProduct } from '../../services/Item';
import { deleteItem } from '../../services/Item';
import { SnackBar } from '../Assets/SnackBar';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Pagination from 'rc-pagination';
import * as xlsx from "xlsx"

export default function ProductListing() {
    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allProduct, setAllProduct] = useState([1, 2])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', images: [] })
    const [open1, setOpen1] = useState(false)

    const [snackbar, ShowSnackbar] = useState({
        show: false,
        vertical: "top",
        horizontal: "right",
        msg: "data added",
        type: "error",
    });
    const [currentPage, setCurrentPage] = React.useState(1);
    const [countPerPage, setCountPerPage] = useState(5);
    const [value, setValue] = React.useState("");
    const [fileData, setFileData] = useState({});
    const [rows, setRows] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [collection, setCollection] = React.useState(
        (allProduct.slice(0, countPerPage))
    );


    const readUploadFile = (e) => {
        if (e.target !== undefined) {
            e.preventDefault();
            setLoader(true)
            setOpen1(false)
            if (e.target.files) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);

                    if (json.length !== 0) {
                        let ss = json.filter(e => allProduct.findIndex(s => s.product_name.toLowerCase() === e.product_name.toLowerCase()) === -1)
                        const body = { "dataSet": ss }

                        await bulkProduct(body).then(es => {
                            setOpen1(true);
                            let data = es.data.data

                            let result = []
                            if (data[0].error) {
                                data.map(e => {
                                    result.push({ error: Object.keys(e.error), row: e.index + 2 })
                                })
                            } else {
                                setOpen1(false);
                            }
                            setLoader(false)
                            setRows(result)
                        })
                    } else {
                        return (<><alert>Do not upload empty sheet</alert></>)
                    }

                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
        }

    }


    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        }
    }, [value, countPerPage, allProduct]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(allProduct.slice(from, to));
    };

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
                if (deletedComp.images.length !== 0) {
                    deletedComp.images.map((item) => {
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


                <Button className="btn_primary" style={{ marginRight: "10px" }} variant="contained" onClick={() => setOpen1(true)}>Import Products</Button>

                <Link style={{ textDecoration: 'none' }} to='/addProduct'>
                    <Button className="btn_primary" variant="contained">Add Product</Button>
                </Link>

            </Box>
            <div className="px-3">
                <TableContainer component={Paper}>
                    <Table>
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
                            {collection.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        {/* <TableCell>{index + 1}</TableCell> */}
                                        <TableCell className='text_cap'>{res.product_name}</TableCell>
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
                    <Box sx={{ m: 1 }} className='d-flex justify-content-end'>
                        <select className="me-2" onChange={(e) => setCountPerPage(e.target.value * 1)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                        <Pagination
                            pageSize={countPerPage}
                            onChange={updatePage}
                            current={currentPage}
                            total={allProduct.length}
                            style={{ color: 'green' }}
                        />
                    </Box>
                </TableContainer>
                <Dialog
                    open={open1}
                    maxWidth={'xs'}
                    fullWidth={true}

                >
                    {isLoading ? (<><CircularProgress /></>) : (<>

                        <Box py={2} px={1} className='over-flow-hide-x'>
                            <h5 className="px-3">Upload Excel File(.xlsx)</h5>
                            <hr />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* <div className="box_style img-btn border"> */}
                                        <div className="btn w-100">
                                            {/* <input type="file" id="2actual-btn" hidden
                                                
                                            />
                                            <label className="text-center text-gray" htmlFor="2actual-btn">
                                                <CloudUploadIcon /><br />
                                                <span>Upload</span>
                                            </label> */}
                                            <Button variant="contained" component="label">
                                                Upload
                                                <input hidden accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" type="file" onChange={(e) => setFileData(e)} />
                                            </Button>
                                        </div>
                                        {/* </div> */}
                                        <br />
                                        {rows.length !== 0 ? (<>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Row</TableCell>
                                                            <TableCell >ERROR</TableCell>


                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows.map((row) => (
                                                            <TableRow
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell >
                                                                    {row.row}
                                                                </TableCell>
                                                                <TableCell >{row.error.toString()}</TableCell>

                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </>) : (<></>)}

                                    </div>
                                    <Box align='right' className='mt-3'>
                                        <span className='btn cancel_btn me-3 py-1 px-3' onClick={() => {
                                            setOpen1(false); setRows([]); setFileData({})
                                        }}>Cancel</span>
                                        <button className="btn custom-btn py-1 px-3" onClick={() => { readUploadFile(fileData);  }}>Submit</button>
                                    </Box>
                                </div>
                            </div>
                        </Box>
                    </>
                    )}
                </Dialog>
            </div>


        </>


    )
}
