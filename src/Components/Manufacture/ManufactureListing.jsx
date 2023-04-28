
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { addManufacturers, deleteManufacturers, editManufacturers, getAllManufacturers, getManufacturerById } from "../../services/Manufacture";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

export const ManufactureListing = () => {

    const [loader, setLoader] = useState(false)
    let navigate = useNavigate()
    const [allManufecture, setManufacture] = useState([

    ])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '' })
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [localImg, setLocalImg] = useState()
    console.log(localImg)
    const [img, setImg] = useState({})
    console.log(img)
    const [imgURL, setImgURL] = useState('')
    const [id, setId] = useState('')
    let manufacturerData = useRef(
        {
            manufacturer_name: '',
            manufacturer_description: '',
            manufacturer_icon: ''
        }
    )
    useEffect(() => {
        getAllManufacture()
    }, [])

    function getAllManufacture() {
        getAllManufacturers()
            .then(res => {
                setLoader(false)
                setManufacture(res.data.data)
                console.log(res.data.data)
            }).catch((err)=>{
                console.log(err)
            })
    }

    function deleteManufacturer() {
        setDeleteModel(false)
        setLoader(true)
        if (deletedComp.icon !== '') {

            const storage = getStorage();
            const desertRef = ref(storage, deletedComp.icon);
            deleteObject(desertRef)
                .then(() => {
                    console.log("image deleted");
                    deleteManufacturers(deletedComp.id)
                    .then(res => {
                        let arr = [...allManufecture]
                    arr.splice(deletedComp.index, 1)
                    setManufacture(arr)
                        setLoader(false)
                    })
                    .catch(err => console.log(err))
                })
                .catch((error) => { });

        } else {
            deleteManufacturers(deletedComp.id)
            .then(res => {
                    let arr = [...allManufecture]
                    arr.splice(deletedComp.index, 1)
                    setManufacture(arr)
                setLoader(false)
            })
            .catch(err => console.log(err))
        }



       
    }

    async function addManufacturer(e) {
        e.preventDefault()
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
                        manufacturerData.current.manufacturer_icon = url
                        console.log(manufacturerData.current)
                        addManufacturers(manufacturerData.current)
                            .then((res) => {
                                console.log(res)
                                getAllManufacture()
                            }).catch((err) => {
                                console.log(err)
                                getAllManufacture()
                            })
                        setLoader(false)
                    });
                })
        } else {
            manufacturerData.current.manufacturer_icon = ''
            addManufacturers(manufacturerData.current)
                .then((res) => {
                    console.log(res)
                    getAllManufacture()
                }).catch((err) => {
                    console.log(err)
                    getAllManufacture()
                })
            setLoader(false)
        }
        setLocalImg('')
        setImg({})
        manufacturerData.current.manufacturer_icon = ''
    }

    async function updateManufacturer(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        if (img.name !== undefined) {
            if (manufacturerData.current.manufacturer_icon !== '') {
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
                                    manufacturerData.current.manufacturer_icon = url
                                    console.log(manufacturerData.current.manufacturer_icon)
                                    editManufacturers(id, manufacturerData.current)
                                        .then((res) => {
                                            console.log(res)
                                            setLoader(false)
                                            getAllManufacture()
                                        }).catch((err) => {
                                            console.log(err)
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
                            manufacturerData.current.manufacturer_icon = url
                            editManufacturers(id, manufacturerData.current)
                                .then((res) => {
                                    console.log(res)
                                    setLoader(false)
                                    getAllManufacture()
                                }).catch((err) => {
                                    console.log(err)
                                    setLoader(false)
                                })
                        });
                    })
            }

        } else {

            editManufacturers(id, manufacturerData.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllManufacture()
                }).catch((err) => {
                    console.log(err)
                    setLoader(false)
                })
        }
        setLocalImg('')
        setImg({})
        
    }

    async function getManufacturerByIdd(idd, icon) {
        setLoader(true)
        setImgURL(icon)
        setId(idd)
        getManufacturerById(idd)
            .then((res) => {
                console.log(res)
                manufacturerData.current = res.data.data
                if (manufacturerData.current.manufacturer_icon) {
                    console.log(manufacturerData.current.manufacturer_icon)
                    setLocalImg(manufacturerData.current.manufacturer_icon)
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
                        <Button className='cancel_btn me-3' onClick={() => setDeleteModel(!deleteModel)}>Cancel</Button>
                        <Button variant="contained" onClick={deleteManufacturer}>Delete</Button>
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

            {/* Add Manufacturer Dialog Box */}
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Add New Manufacturer</h5>
                    <hr />
                    <form onSubmit={addManufacturer}>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Manufacturer Name:</b></small></div>
                                    <input type='text'
                                    required
                                        onChange={(e) =>
                                            {
                                                if(e.target.value == ' '){
                                                    e.target.value = ''
                                                }else{
                                                    manufacturerData.current.manufacturer_name = e.target.value}
                                            } }
                                        placeholder="Enter Manufacturer Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Manufacturer Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        onChange={(e) =>
                                            {
                                                if(e.target.value == ' '){
                                                    e.target.value = ''
                                                }else{
                                                    manufacturerData.current.manufacturer_description = e.target.value}
                                            } }
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Add Manufacturer Icon:</b></small></div>
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
                                        manufacturerData.current = {}
                                    }}>Cancel</span>
                                    <button className="btn custom-btn py-1 px-3" type="submit">Add</button>
                                </Box>
                            </div>
                        </div>
                    </form>
                </Box>

            </Dialog>

            {/* Edit Manufacturer Dialog Box */}
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
            >

                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Edit Manufacturer</h5>
                    <hr />
                    <form onSubmit={updateManufacturer}>
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Manufacturer Name:</b></small></div>
                                    <input type='text'
                                    required
                                        defaultValue={manufacturerData.current.manufacturer_name}
                                        onChange={(e) =>{
                                            if(e.target.value == ' '){
                                                e.target.value = ''
                                            }else{
                                                manufacturerData.current.manufacturer_name = e.target.value}
                                        } }
                                        placeholder="Enter Manufacturer Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Manufacturer Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        defaultValue={manufacturerData.current.manufacturer_description}
                                        onChange={(e) => {
                                            if(e.target.value == ' '){
                                                e.target.value = ''
                                            }else{
                                                manufacturerData.current.manufacturer_description = e.target.value}
                                        }}
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Update Manufacturer Icon:</b></small></div>
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
                                        manufacturerData.current = {}
                                    }}>Cancel</span>
                                    <button className="btn custom-btn py-1 px-3" type="submit">Update</button>
                                </Box>
                            </div>
                        </div>
                    </form>
                </Box>

            </Dialog>



            <h1 className="mt-2 fs-2 mx-3">Manufactures</h1>

            <Box align='right' className='px-3 pb-3'>
                <Button className="btn_primary" onClick={() => setOpen(true)} variant="contained">Add Manufacture</Button>
            </Box>
            <div className="px-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>S.No.</b></TableCell>
                            <TableCell><b>Manufacture Name</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allManufecture.map((res, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.manufacturer_name}</TableCell>
                                    <TableCell>
                                        <Delete sx={{ cursor: 'pointer' }} onClick={() => {
                                            setDeletedComp({ id: res._id, index, icon: res.manufacturer_icon })
                                            setDeleteModel(!deleteModel)
                                        }} />
                                        <Edit sx={{ cursor: 'pointer' }} onClick={() => {
                                            getManufacturerByIdd(res._id, res.manufacturer_icon)
                                            setOpen1(true)
                                        }} />
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
