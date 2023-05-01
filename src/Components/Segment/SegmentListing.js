import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Dialog, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { VehicleClass } from "../../services/Vehicle";
import { Triangle } from 'react-loader-spinner'
import { Delete, Edit } from "@mui/icons-material";
import { storage } from "../../auth/Firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { SnackBar } from "../Assets/SnackBar";

export const SegmentListing = () => {

    const [allVehicles, setAllVehicles] = useState([])
    const [loader, setLoader] = useState(true)
    const [deleteVeh, setDeletedVeh] = useState({ id: '', index: '', icon: '' })
    const [deleteModel, setDeleteModel] = useState(false)
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
    console.log(id)
    const segmentData = useRef(
        {
            vehicle_name: '',
            vehicle_description: '',
            vehicle_icon: ''
        }
    )
    console.log(segmentData.current)

    useEffect(() => {
        getAllVehicles()
    }, [])

    async function getAllVehicles() {
        setLoader(true)
        VehicleClass.getAllVehicles()
            .then((res) => {
                setAllVehicles(res.data.data)
                setLoader(false)
                console.log(res.data.data)

            })
            .catch(err => console.log(err))
    }

    async function deleteVehicle() {
        console.log(deleteVeh.icon)
        setDeleteModel(false)
        setLoader(true)
        if (deleteVeh.icon !== '') {

            const storage = getStorage();
            const desertRef = ref(storage, deleteVeh.icon);
            deleteObject(desertRef)
                .then(() => {
                    console.log("image deleted");
                    VehicleClass.deleteVehicle(deleteVeh.id)
                        .then(res => {
                            console.log(res)
                            let arr = [...allVehicles]
                            arr.splice(deleteVeh.index, 1)
                            setAllVehicles(arr)
                            setLoader(false)
                            ShowSnackbar({
                                show: true,
                                vertical: "top",
                                horizontal: "right",
                                msg: "Segment Deleted successfully",
                                type: "success",
                              });
                        })
                        .catch(err => console.log(err))
                })
                .catch((error) => { });

        } else {
            VehicleClass.deleteVehicle(deleteVeh.id)
                .then(res => {
                    console.log(res)
                    let arr = [...allVehicles]
                    arr.splice(deleteVeh.index, 1)
                    setAllVehicles(arr)
                    setLoader(false)
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Segment Deleted successfully",
                        type: "success",
                      });
                })
                .catch(err => console.log(err))
        }

    }

    async function addSegment(e) {
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
                        segmentData.current.vehicle_icon = url
                        console.log(segmentData.current)

                        VehicleClass.addVehicle(segmentData.current)
                            .then((res) => {
                                console.log(res)
                                setLoader(false)
                                getAllVehicles()
                                ShowSnackbar({
                                    show: true,
                                    vertical: "top",
                                    horizontal: "right",
                                    msg: "Segment Added successfully",
                                    type: "success",
                                  });
                            }).catch((err) => {
                                console.log(err)
                                getAllVehicles()
                            })

                    });
                })
        } else {
            segmentData.current.vehicle_icon = ''
            VehicleClass.addVehicle(segmentData.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllVehicles()
                    ShowSnackbar({
          show: true,
          vertical: "top",
          horizontal: "right",
          msg: "Segment Added successfully",
          type: "success",
        });
                }).catch((err) => {
                    console.log(err)
                    getAllVehicles()
                })
        }
        setLocalImg('')
        setImg({})
        segmentData.current.vehicle_icon = ''
    }

    async function updateSegment(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(img)
        if (img.name !== undefined) {
            if (segmentData.current.vehicle_icon !== '') {
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
                                    segmentData.current.vehicle_icon = url
                                    VehicleClass.editVehicle(id, segmentData.current)
                                        .then((res) => {
                                            console.log(res)
                                            setLoader(false)
                                            getAllVehicles()
                                            ShowSnackbar({
                                                show: true,
                                                vertical: "top",
                                                horizontal: "right",
                                                msg: "Segment Updated successfully",
                                                type: "success",
                                              });

                                        }).catch((err) => {
                                            console.log(err)
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
                            segmentData.current.vehicle_icon = url
                            VehicleClass.editVehicle(id, segmentData.current)
                                .then((res) => {
                                    console.log(res)
                                    setLoader(false)
                                    getAllVehicles()
                                    ShowSnackbar({
                                        show: true,
                                        vertical: "top",
                                        horizontal: "right",
                                        msg: "Segment Updated successfully",
                                        type: "success",
                                      });

                                }).catch((err) => {
                                    console.log(err)
                                })
                        });
                    })
            }

        } else {

            VehicleClass.editVehicle(id, segmentData.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllVehicles()
                    ShowSnackbar({
                        show: true,
                        vertical: "top",
                        horizontal: "right",
                        msg: "Segment Updated successfully",
                        type: "success",
                      });
                }).catch((err) => {
                    console.log(err)
                })
        }
        setLocalImg('')
        setImg({})
    }

    async function getSegmentById(idd, icon) {
        setImgURL(icon)
        setLoader(true)
        setId(idd)
        VehicleClass.getVehicle(idd)
            .then((res) => {
                console.log(res)
                segmentData.current = res.data.data[0]
                if (segmentData.current.vehicle_icon) {
                    console.log(segmentData.current.vehicle_icon)
                    setLocalImg(segmentData.current.vehicle_icon)
                }
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
            })
    }

    // const UploadImage = (e) => {
    //     console.log(e.target.files[0])
    //     let image = e.target.files[0]

    //     if (segmentData.current.vehicle_icon !== undefined) {

    //         const storage = getStorage();
    //         const desertRef = ref(storage, segmentData.current.vehicle_icon);
    //         deleteObject(desertRef)
    //             .then(() => {
    //                 console.log("image deleted");
    //             })
    //             .catch((error) => { });

    //     }

    //     const storageRef = ref(storage, image.name);
    //     const uploadTask = uploadBytesResumable(storageRef, image);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => { },
    //         (err) => console.log(err),
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                 console.log(url)
    //                 segmentData.current.vehicle_icon = url
    //             });
    //         })
    // }

    function switchBtn(e, id, index) {
        setLoader(true)

        VehicleClass.editVehicle(id, { is_active: e.target.checked })
            .then(res => {
                console.log(res)
                setLoader(false)

                let arr2 = [...allVehicles]
                arr2[index].is_active = !e.target.checked
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
           <SnackBar snackBarData={snackbar} setData={ShowSnackbar} />
            <Box sx={{ width: '100%' }} px={2}>
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
                            <Button variant="contained" onClick={deleteVehicle}>Delete</Button>
                        </Box>
                    </Box>

                </Dialog>

                {/* Add Segment Dialog Box */}
                <Dialog
                    open={open}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <Box py={2} px={1} className='over-flow-hide-x'>
                        <h5 className="px-3">Add New Segment</h5>
                        <hr />
                        <form onSubmit={addSegment}>
                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="py-2"><small><b><span className='text-danger'>*</span>Segment Name:</b></small></div>
                                        <input type='text' required onChange={(e) =>
                                        {
                                            if(e.target.value == ' '){
                                                e.target.value = ''
                                            }else{
                                                segmentData.current.vehicle_name = e.target.value} 
                                        }
                                             
                                             } placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="py-2"><small><b>Segment Description:</b></small></div>
                                        <textarea
                                            className="w-100 form-control"
                                            onChange={(e) => 
                                                {
                                                    if(e.target.value == ' '){
                                                        e.target.value = ''
                                                    }else{
                                                        segmentData.current.vehicle_description = e.target.value} 
                                                }
                                                }
                                            rows='3'
                                            placeholder='Enter Description'

                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="py-2"><small><b><span className='text-danger'>*</span>Add Segment Icon:</b></small></div>
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

                {/* Edit Segment Dialog Box */}
                <Dialog
                    open={open1}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <Box py={2} px={1} className='over-flow-hide-x'>
                        <h5 className="px-3">Edit Segment</h5>
                        <hr />
                        <form onSubmit={updateSegment}>
                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="py-2"><small><b><span className='text-danger'>*</span>Segment Name:</b></small></div>
                                        <input type='text' required onChange={(e) =>
                                        {
                                            if(e.target.value == ' '){
                                                e.target.value = ''
                                            }else{
                                                segmentData.current.vehicle_name = e.target.value}
                                        }
                                            } defaultValue={segmentData.current.vehicle_name} placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="py-2"><small><b>Segment Description:</b></small></div>
                                        <textarea
                                            defaultValue={segmentData.current.vehicle_description}
                                            className="w-100 form-control"
                                            onChange={(e) => 
                                                {if(e.target.value == ' '){
                                                    e.target.value = ''
                                                }else{
                                                    segmentData.current.vehicle_description = e.target.value}}}
                                            rows='3'
                                            placeholder='Enter Description'
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="py-2"><small><b><span className='text-danger'>*</span>Update Segment Icon:</b></small></div>
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


                <h1 className="mt-2 fs-2 ">Segment</h1>
                <Box align='right' className='pb-3'>
                    <Button className="btn_primary" variant="contained" onClick={() => setOpen(true)}>Add Segment</Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table className="border">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Sno.</b></TableCell>
                                <TableCell><b>Segment name</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                {/* <TableCell><b>Icon</b></TableCell> */}
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allVehicles.map((res, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{res.vehicle_name}</TableCell>
                                            <TableCell><Switch checked={res.is_active} onChange={(e) => switchBtn(e, res._id, index)} /></TableCell>
                                            {/* <TableCell>{res.vehicle_icon}</TableCell> */}
                                            <TableCell>
                                                <Delete sx={{ cursor: 'pointer' }} onClick={() => {
                                                    setDeletedVeh({ id: res._id, index, icon: res.vehicle_icon })
                                                    setDeleteModel(true)
                                                }} />
                                                <Edit sx={{ cursor: 'pointer' }} onClick={() => { getSegmentById(res._id, res.vehicle_icon) }} />
                                                {/* <RemoveRedEye sx={{ cursor: 'pointer' }} onClick={() => navigate(`/viewVehicle/${res._id}`)} /> */}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box >

        </>
    )
}