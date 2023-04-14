import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Dialog, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { VehicleClass } from "../../services/Vehicle";
import { Grid, Triangle } from 'react-loader-spinner'
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";


export const SegmentListing = () => {

    const [allVehicles, setAllVehicles] = useState([])
    const [loader, setLoader] = useState(true)
    const [deleteVeh, setDeletedVeh] = useState({ id: '', index: '' })
    const [deleteModel, setDeleteModel] = useState(false)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [id, setId] = useState('')
    const segmentData = useRef(
        {
            vehicle_name: '',
            vehicle_description: '',
            vehicle_icon: '',
        }
    )
    console.log(segmentData.current)
    let navigate = useNavigate()

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
        console.log(deleteVeh)
        setDeleteModel(false)
        setLoader(true)
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

    async function addSegment(e) {
        e.preventDefault()
        console.log(segmentData.current)
        setLoader(true)
        setOpen(false)
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

    async function updateSegment(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        VehicleClass.editVehicle(id, segmentData.current)
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllVehicles()
            }).catch((err) => {
                console.log(err)
            })
    }

    async function getSegmentById(idd) {
        setLoader(true)
        setId(idd)
        VehicleClass.getVehicle(idd)
            .then((res) => {
                console.log(res)
                segmentData.current = res.data.data
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
            })
    }

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
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Add Segment</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Segment Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => segmentData.current.vehicle_name = e.target.value} placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                  
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div>
                        </div>

                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={addSegment}>Add</Button>
                        </Box>
                    </Box>

                </Dialog>

                {/* Edit Segment Dialog Box */}
                <Dialog
                    open={open1}
                    maxWidth={'xs'}

                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Edit Segment</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Segment Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => segmentData.current.vehicle_name = e.target.value} defaultValue={segmentData.current.vehicle_name} placeholder="Enter Segment Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                    defaultValue={segmentData.current.vehicle_description}
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div>
                        </div>
                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() => setOpen1(false)}>Cancel</Button>
                            <Button variant="contained" onClick={updateSegment}>Update</Button>
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
                                                    setDeletedVeh({ id: res._id, index })
                                                    setDeleteModel(true)
                                                }} />
                                                <Edit sx={{ cursor: 'pointer' }} onClick={() => {getSegmentById(res._id)}} />
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