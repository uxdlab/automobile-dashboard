import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Dialog, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { VehicleClass } from "../../services/Vehicle";
import { Triangle } from 'react-loader-spinner'
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { storage } from "../../auth/Firebase";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


export const SegmentListing = () => {

    const [allVehicles, setAllVehicles] = useState([])
    const [loader, setLoader] = useState(true)
    const [deleteVeh, setDeletedVeh] = useState({ id: '', index: '', icon: '' })
    const [deleteModel, setDeleteModel] = useState(false)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [localImg,setLocalImg] = useState()
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
                        })
                        .catch(err => console.log(err))
                })
                .catch((error) => { });

        }else{
            VehicleClass.deleteVehicle(deleteVeh.id)
                        .then(res => {
                            console.log(res)
                            let arr = [...allVehicles]
                            arr.splice(deleteVeh.index, 1)
                            setAllVehicles(arr)
                            setLoader(false)
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
                        }).catch((err) => {
                            console.log(err)
                            getAllVehicles()
                        })
                   
                });
            })
        }else{
            segmentData.current.vehicle_icon= ''
            VehicleClass.addVehicle(segmentData.current)
                        .then((res) => {
                            console.log(res)
                            setLoader(false)
                            getAllVehicles()
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
            if (segmentData.current.vehicle_icon !== '' ) {
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
                                            
                                        }).catch((err) => {
                                            console.log(err)
                                        })
                                });
                            })

                    })
                    .catch((error) => { });

              
            }else{
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
                if(segmentData.current.vehicle_icon){
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

    const imgPrev = (imgs)=>{
        console.log('okkkkkkkkkkkkkkkkkkkkkkk')
        console.log(imgs)
     if(imgs.name!==undefined){
        let url = URL.createObjectURL(imgs)
        setLocalImg(url)
        console.log(url)
     }else{
      setLocalImg(undefined)
     }
    }

    return (
        <>
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
                    maxWidth={'sm'}

                    fullWidth={true}
                >
                    <Box p={3} sx={{ overflowX: 'hidden' }}>
                        <Typography variant="h5" className="text-center mb-2">Add Segment</Typography>
                        <div className="container-fluid p-0 m-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-12"><small><b>Segment Name:</b></small></div>
                                    <div className="col-md-12">
                                        <input type='text' onChange={(e) => segmentData.current.vehicle_name = e.target.value} placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                                    </div>

                                    <div className="col-md-12"><small><b>Segment Description:</b></small></div>
                                    <div className="col-md-12"><textarea

                                        className="w-100 form-control"
                                        onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    /></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-12 text-center"><small><b>Add Icon</b></small></div>
                                    <div className="col-md-12 d-flex justify-content-center py-2">
                                        <div className="border w-50 px-2">
                                            <img className="w-100 h" src={localImg!==undefined && localImg?localImg:'https://cdn.iconscout.com/icon/free/png-256/photo-size-select-actual-1782180-1512958.png'} alt='' />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button
                                            className="pt-1"
                                            variant="other"
                                            style={{
                                                background: "#534ba8",
                                                color: "#ffffff",
                                                border: "1px solid #534ba8",
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <input
                                                onChange={(e) => {setImg(e.target.files[0])
                                                    imgPrev(e.target.files[0])}}
                                                type="file"
                                                id={`actual-btn`}
                                                hidden
                                            />
                                            <label
                                                htmlFor={`actual-btn`}
                                                className="w-100 text-center "
                                                role="button"
                                            >
                                                Upload Icon
                                            </label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() =>{
                                setOpen(false)
                                setLocalImg('')
                                }}>Cancel</Button>
                            <Button variant="contained" sx={{ background: '#534ba8' }} onClick={addSegment}>Add</Button>
                        </Box>
                    </Box>

                </Dialog>

                {/* Edit Segment Dialog Box */}
                <Dialog
                    open={open1}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Edit Segment</Typography>
                        <div className="container-fluid p-0 m-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="col-md-12"><small><b>Segment Name:</b></small></div>
                                    <div className="col-md-12">
                                        <input type='text' onChange={(e) => segmentData.current.vehicle_name = e.target.value} defaultValue={segmentData.current.vehicle_name} placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                                    </div>

                                    <div className="col-md-12"><small><b>Segment Description:</b></small></div>
                                    <div className="col-md-12"><textarea
                                        defaultValue={segmentData.current.vehicle_description}
                                        className="w-100 form-control"
                                        onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    /></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-12 text-center"><small><b>Add Icon</b></small></div>
                                    <div className="col-md-12 d-flex justify-content-center py-2">
                                        <div className="border w-50 px-2">
                                            <img className="w-100" src={localImg!==undefined && localImg?localImg:'https://cdn.iconscout.com/icon/free/png-256/photo-size-select-actual-1782180-1512958.png'} alt='' />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button
                                            className="pt-1"
                                            variant="other"
                                            style={{
                                                background: "#534ba8",
                                                color: "#ffffff",
                                                border: "1px solid #534ba8",
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <input
                                                onChange={(e) => {setImg(e.target.files[0])
                                                    imgPrev(e.target.files[0])}}
                                                type="file"
                                                id={`actual-btn`}
                                                hidden
                                            />
                                            <label
                                                htmlFor={`actual-btn`}
                                                className="w-100 text-center "
                                                role="button"
                                            >
                                                Upload Icon
                                            </label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() =>{ 
                                setOpen1(false)
                                setLocalImg('')
                                }}>Cancel</Button>
                            <Button variant="contained" sx={{ background: '#534ba8' }} onClick={updateSegment}>Update</Button>
                        </Box>
                    </Box>
                </Dialog>


                <h1 className="mt-2 fs-2 ">Segment</h1>
                <Box align='right' className='pb-3'>
                    {/* <Link style={{ textDecoration: 'none' }} to='/addSegment'> */}
                    <Button className="btn_primary" variant="contained" onClick={() => setOpen(true)}>Add Segment</Button>
                    {/* </Link> */}
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