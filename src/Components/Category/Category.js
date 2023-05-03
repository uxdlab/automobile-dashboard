
import { Delete, Edit } from "@mui/icons-material";
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { ProductClass } from "../../services/Product";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { SnackBar } from "../Assets/SnackBar";

export const Category = () => {
    const [loader, setLoader] = useState(false)
    const [deleteModel, setDeleteModel] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [deletedVeh, setDeletedVeh] = useState({ id: '', index: '', icon: '' })
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [snackbar, ShowSnackbar] = useState({
        show: false,
        vertical: "top",
        horizontal: "right",
        msg: "data added",
        type: "error",
    });
    const [localImg, setLocalImg] = useState()
    console.log(localImg)
    const [img, setImg] = useState({})
    console.log(img)
    const [imgURL, setImgURL] = useState('')
    const [id, setId] = useState('')
    const allCategory = useRef(
        {
            category_name: '',
            category_description: '',
            category_icon: ''
        }
    )


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
                console.log(err)
            })
    }
    function deleteProduct() {
        setLoader(true)
        setDeleteModel(false)
        if (deletedVeh.icon !== '') {

            const storage = getStorage();
            const desertRef = ref(storage, deletedVeh.icon);
            deleteObject(desertRef)
                .then(() => {
                    console.log("image deleted");
                    ProductClass.deleteProduct(deletedVeh.id)
                        .then(res => {
                            console.log(res)
                            let arr = [...allProducts]
                            arr.splice(deletedVeh.index, 1)
                            setAllProducts(arr)
                            setLoader(false)
                            ShowSnackbar({
                                show: true,
                                vertical: "top",
                                horizontal: "right",
                                msg: "Category Deleted successfully",
                                type: "success",
                            });
                        })
                        .catch(err => console.log(err))
                })
                .catch((error) => { });

        } else {
            ProductClass.deleteProduct(deletedVeh.id)
                .then(res => {
                    console.log(res)
                    let arr = [...allProducts]
                    arr.splice(deletedVeh.index, 1)
                    setAllProducts(arr)
                    setLoader(false)
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Category Deleted successfully",
                        type: "success",
                    });
                })
                .catch(err => console.log(err))
        }



    }

    async function addCategory(e) {
        e.preventDefault()
        console.log(allCategory.current)
        setLoader(true)
        setOpen(false)
        if (img.name !== undefined) {
            const storageRef = ref(storage, img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url)
                        allCategory.current.category_icon = url
                        console.log(allCategory.current)

                        ProductClass.addProduct(allCategory.current)
                            .then((res) => {
                                console.log(res)
                                getAllProducts()
                                setLoader(false)
                                ShowSnackbar({
                                    show: true,
                                    vertical: "top",
                                    horizontal: "right",
                                    msg: "Category Added successfully",
                                    type: "success",
                                });
                            }).catch((err) => {
                                console.log(err)
                                setLoader(false)
                                ShowSnackbar({
                                    show: true,
                                    vertical: "top",
                                    horizontal: "right",
                                    msg: "Category Already Exist",
                                    type: "error",
                                });
                                getAllProducts()
                            })

                    });
                })
        } else {
            allCategory.current.category_icon = ''
            ProductClass.addProduct(allCategory.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllProducts()
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Category Added successfully",
                        type: "success",
                    });
                }).catch((err) => {
                    console.log(err)
                    setLoader(false)
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Category Already Exist",
                        type: "error",
                    });
                    getAllProducts()
                })
        }
        setLocalImg('')
        setImg({})
        allCategory.current.category_icon = ''

    }

    async function updateCategory(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        if (img.name !== undefined) {
            if (allCategory.current.category_icon !== '') {
                const storage = getStorage();
                const desertRef = ref(storage, imgURL);
                deleteObject(desertRef)
                    .then(() => {
                        console.log("image deleted");
                        const storageRef = ref(storage, img.name);
                        const uploadTask = uploadBytesResumable(storageRef, img);
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => { },
                            (err) => console.log(err),
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                    console.log(url)
                                    allCategory.current.category_icon = url
                                    ProductClass.editProduct(id, allCategory.current)
                                        .then((res) => {
                                            console.log(res)
                                            setLoader(false)
                                            getAllProducts()
                                            ShowSnackbar({
                                                show: true,
                                                vertical: "top",
                                                horizontal: "right",
                                                msg: "Category Updated successfully",
                                                type: "success",
                                            });
                                        }).catch((err) => {
                                            console.log(err)
                                            setLoader(false)
                                            ShowSnackbar({
                                                show: true,
                                                vertical: "top",
                                                horizontal: "right",
                                                msg: "Category Already Exist",
                                                type: "error",
                                            });
                                            setLoader(false)
                                        })
                                });
                            })

                    })
                    .catch((error) => { });


            } else {
                const storageRef = ref(storage, img.name);
                const uploadTask = uploadBytesResumable(storageRef, img);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => { },
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url)
                            allCategory.current.category_icon = url
                            ProductClass.editProduct(id, allCategory.current)
                                .then((res) => {
                                    console.log(res)
                                    setLoader(false)
                                    getAllProducts()
                                    ShowSnackbar({
                                        show: true,
                                        vertical: "top",
                                        horizontal: "right",
                                        msg: "Category Updated successfully",
                                        type: "success",
                                    });
                                }).catch((err) => {
                                    console.log(err)
                                    setLoader(false)
                                    ShowSnackbar({
                                        show: true,
                                        vertical: "top",
                                        horizontal: "right",
                                        msg: "Category Already Exist",
                                        type: "error",
                                    });
                                    setLoader(false)
                                })
                        });
                    })
            }

        } else {

            ProductClass.editProduct(id, allCategory.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllProducts()
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Category Updated successfully",
                        type: "success",
                    });
                }).catch((err) => {
                    console.log(err)
                    setLoader(false)
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Category Already Exist",
                        type: "error",
                    });
                    setLoader(false)
                })
        }
        setLocalImg('')
        setImg({})
    }

    async function getCategoryById(idd, icon) {
        setLoader(true)
        setImgURL(icon)
        setId(idd)
        ProductClass.getProduct(idd)
            .then((res) => {
                console.log(res)
                allCategory.current = res.data.data
                if (allCategory.current.category_icon) {
                    console.log(allCategory.current.category_icon)
                    setLocalImg(allCategory.current.category_icon)
                }
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
                setLoader(false)

            })
    }

    const imgPrev = (imgs) => {
        console.log('okkkkkkkkkkkkkkkkkkkkkkk')
        console.log(imgs)
        if (imgs.name !== undefined) {
            let url = URL.createObjectURL(imgs)
            setLocalImg(url)
            console.log(url)
        } else {
            setLocalImg(undefined)
        }
    }


    return (
        <Box>
            <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
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
                maxWidth={'xs'}
                fullWidth={true}
            >

                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Add New Category</h5>
                    <hr />
                    <form onSubmit={addCategory}>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Category Name:</b></small></div>
                                    <input type='text' required onChange={(e) => {
                                        if (e.target.value == ' ') {
                                            e.target.value = ''
                                        } else {
                                            allCategory.current.category_name = e.target.value.trim().toLocaleLowerCase()
                                        }
                                    }} placeholder="Enter Category Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Category Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        onChange={(e) => {
                                            if (e.target.value == ' ') {
                                                e.target.value = ''
                                            } else {
                                                allCategory.current.category_description = e.target.value
                                            }
                                        }}
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Add Category Icon:</b></small></div>
                                    <div className="d-flex">
                                        {localImg ?
                                            <div className="w-25 me-1 relative">
                                                <CloseIcon onClick={() => {
                                                    setLocalImg('')
                                                    setImg({})
                                                }} className="close-btn-position" />
                                                <img className="img-style" src={localImg} />
                                            </div> : ''}
                                        <div className="w-25">
                                            <div className="btn img-btn w-100">
                                                <input type="file" id="2actual-btn" hidden
                                                    onChange={(e) => {
                                                        setImg(e.target.files[0])
                                                        imgPrev(e.target.files[0])
                                                        e.target.value = ''
                                                    }}
                                                />
                                                <label className="text-center text-gray" htmlFor="2actual-btn">
                                                    <CloudUploadIcon /><br />
                                                    <span>Upload</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Box align='right' className='mt-3'>
                                    <span className='btn cancel_btn me-3 py-1 px-3' onClick={() => {
                                        setOpen(false)
                                        setLocalImg('')
                                    }}>Cancel</span>
                                    <button className="btn custom-btn py-1 px-3" type="submit">Add</button>
                                </Box>
                            </div>
                        </div>
                    </form>
                </Box>

            </Dialog>

            {/* Edit Category Dialog Box */}
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Edit Category</h5>
                    <hr />
                    <form onSubmit={updateCategory}>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Category Name:</b></small></div>
                                    <input type='text' required onChange={(e) => {
                                        if (e.target.value == ' ') {
                                            e.target.value = ''
                                        } else {
                                            allCategory.current.category_name = e.target.value.trim().toLocaleLowerCase()
                                        }
                                    }} defaultValue={allCategory.current.category_name} placeholder="Enter Category Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Category Description:</b></small></div>
                                    <textarea
                                        defaultValue={allCategory.current.category_description}
                                        className="w-100 form-control"
                                        onChange={(e) => {
                                            if (e.target.value == ' ') {
                                                e.target.value = ''
                                            } else {
                                                allCategory.current.category_description = e.target.value
                                            }
                                        }}
                                        rows='3'
                                        placeholder='Enter Description'
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Update Category Icon:</b></small></div>
                                    <div className="d-flex">
                                        {localImg ?
                                            <div className="w-25 me-1 relative">
                                                <CloseIcon onClick={() => {
                                                    setLocalImg('')
                                                    setImg({})
                                                }} className="close-btn-position" />
                                                <img className="img-style" src={localImg} />
                                            </div> : ''}
                                        <div className="w-25">
                                            <div className="btn img-btn w-100">
                                                <input type="file" id="2actual-btn" hidden
                                                    onChange={(e) => {
                                                        setImg(e.target.files[0])
                                                        imgPrev(e.target.files[0])
                                                        e.target.value = ''
                                                    }}
                                                />
                                                <label className="text-center text-gray" htmlFor="2actual-btn">
                                                    <CloudUploadIcon /><br />
                                                    <span>Upload</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Box align='right' className='mt-3'>
                                    <span className='btn cancel_btn me-3 py-1 px-3' onClick={() => {
                                        setOpen1(false)
                                        setLocalImg('')
                                    }}>Cancel</span>
                                    <button className="btn custom-btn py-1 px-3" type="submit">Update</button>
                                </Box>
                            </div>
                        </div>
                    </form>
                </Box>


            </Dialog>


            <h1 className="mt-2 fs-2 mx-3">Category</h1>
            <Box align='right' className='px-3'>
                <Button className="btn_primary" onClick={() => setOpen(true)} variant="contained">Add Category</Button>
            </Box>

            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell className="w-12"><b>S.No.</b></TableCell>
                            <TableCell className="w-25"><b>Category Icon</b></TableCell>
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
                                        <TableCell><img className='w-12' src={res.category_icon?res.category_icon:'images/noImage.png'}/></TableCell>
                                        <TableCell sx={{textTransform:'capitalize'}}>{res.category_name}</TableCell>
                                        {/* <TableCell>{res.product_icon}</TableCell> */}
                                        <TableCell>
                                            <Delete className="pointer" onClick={() => {
                                                setDeletedVeh({ id: res._id, index, icon: res.category_icon })
                                                setDeleteModel(true)
                                            }} />
                                            <Edit className="pointer" onClick={() => getCategoryById(res._id, res.category_icon)} />

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
