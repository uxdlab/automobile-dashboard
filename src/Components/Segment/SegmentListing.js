import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, Dialog, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { VehicleClass } from "../../services/Vehicle";
import { Triangle } from 'react-loader-spinner'
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";


export const SegmentListing = () => {

    const [allVehicles, setAllVehicles] = useState([])
    const [loader, setLoader] = useState(true)
    const [deleteVeh, setDeletedVeh] = useState({ id: '', index: '' })
    const [deleteModel, setDeleteModel] = useState(false)

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
            <Box sx={{width:'100%'}} px={2}>
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
                            <Button variant="contained" onClick={deleteVehicle}>Delete</Button>
                        </Box>
                    </Box>

                </Dialog>


                <div className="mt-2 fs-2 ">Segment</div>

                <Box align='right' className='pb-3 py-3'>
                    <Link style={{ textDecoration: 'none' }} to='/addSegment'>
                        <Button className="btn_primary" style={{background:'#4539ca'}} variant="contained">Add Segment</Button>
                    </Link>
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
                                                <Edit sx={{ cursor: 'pointer' }} onClick={() => navigate(`/editSegment/${res._id}`)} />
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