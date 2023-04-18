
import React, { useEffect, useRef, useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import "rc-pagination/assets/index.css";
import { ModelClass } from "../../services/Model";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Triangle } from "react-loader-spinner";

export const ModelListing = () => {

    const [loader, setLoader] = useState(true)

    const [allData, setData] = useState([])
    const [countPerPage, setCountPerPage] = useState(5);
    const [value, setValue] = React.useState("");
    const [deleteModel, setDeleteModel] = useState(false)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [deleteMod, setDeletedMod] = useState({ id: '', index: '' })
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [id, setId] = useState('')
    let modelData = useRef({ model_name: '' })

    const [collection, setCollection] = React.useState(
        (allData.slice(0, countPerPage))
    );
    let navigate = useNavigate()
    useEffect(() => {
        getAllModels()
    }, [])
    function getAllModels() {
        setLoader(true)
        ModelClass.getAllModel()
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        }
    }, [value, countPerPage, allData]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(allData.slice(from, to));
    };
    function deleteModelf() {
        console.log(deleteMod)
        setDeleteModel(false)
        setLoader(true)

        ModelClass.deleteModel(deleteMod.id)
            .then(res => {
                console.log(res)
                getAllModels()
            })
            .catch(err => console.log(err))
    }


    async function addModel(e) {
        e.preventDefault()
        console.log(modelData.current)
        setLoader(true)
        setOpen(false)
        ModelClass.addModel(modelData.current)
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllModels()
            }).catch((err) => {
                console.log(err)
                getAllModels()
            })

    }

    async function updateModel(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        ModelClass.editModel(id, modelData.current)
            .then((res) => {
                console.log(res)
                setLoader(false)
                getAllModels()
            }).catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }

    async function getModelById(idd) {
        setLoader(true)
        setId(idd)
        ModelClass.getModel(idd)
            .then((res) => {
                console.log(res)
                modelData.current = res.data.data
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
                setLoader(false)
                
            })
    }
    return (
        <>
            <h1 className="mt-2 fs-2 mx-3">Models</h1>
            <Box align='right' className='px-3 pb-3'>
                    <Button className="btn_primary" onClick={()=>setOpen(true)}  variant="contained">Add Model</Button>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <Dialog
                    open={deleteModel}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Box>Are you sure you want to delete?</Box>
                        <Box align='right'>
                            <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                            <Button variant="contained" onClick={deleteModelf}>Delete</Button>
                        </Box>
                    </Box>

                </Dialog>
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

            {/* Add Brand Dialog Box */}
            <Dialog
                    open={open}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Add Model</Typography>
                        <div className="container-fluid p-0 m-0">
                               <div className="row">
                                <div className="col-md-6">
                                <div className="col-md-12"><small><b>Model Name:</b></small></div>
                                <div className="col-md-12">
                                <input type='text' onChange={(e) => modelData.current.model_name = e.target.value} placeholder="Enter Model Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                {/* <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                  
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div> */}
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-12 text-center"><small><b>Add Icon</b></small></div>
                                    <div className="col-md-12 d-flex justify-content-center py-2">
                                        <div className="border w-50 px-2">
                                            <img className="w-100 h" src='https://cdn.iconscout.com/icon/free/png-256/photo-size-select-actual-1782180-1512958.png' alt='' />
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
                                                //   onChange={(e) => inpChange(e, index)}
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
                            <Button className='cancel_btn me-3' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={addModel}>Add</Button>
                        </Box>
                    </Box>

                </Dialog>

                {/* Edit Brand Dialog Box */}
                <Dialog
                    open={open1}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Typography variant="h5" className="text-center mb-2">Edit Model</Typography>
                        <div className="container-fluid p-0 m-0">
                                <div className="col-md-5"><small><b>Model Name:</b></small></div>
                                <div className="col-md-7">
                                <input type='text' onChange={(e) => modelData.current.model_name = e.target.value} defaultValue={modelData.current.model_name} placeholder="Enter Model Name" className="form-control w-100 mb-2" />
                            </div>
                       
                                {/* <div className="col-md-5 "><small><b>Segment Description:</b></small></div>
                                <div className="col-md-7"><textarea
                                  
                                    className="w-100 form-control"
                                    onChange={(e) => segmentData.current.vehicle_description = e.target.value}
                                    rows='3'
                                    placeholder='Enter Description'

                                /></div> */}
                        </div>

                        <Box align='right' className='mt-3'>
                            <Button className='cancel_btn me-3' onClick={() => setOpen1(false)}>Cancel</Button>
                            <Button variant="contained" onClick={updateModel}>Update</Button>
                        </Box>
                    </Box>

                </Dialog>

            {!loader ?
                <Box sx={{ mx: 2 }} className='border'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collection.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{res.model_name}</TableCell>
                                        <TableCell>
                                            {/* <RemoveRedEye onClick={() => navigate(`/model/${res._id}`)} /> */}
                                            <Delete
                                                onClick={() => {
                                                    setDeletedMod({ id: res._id, index })
                                                    setDeleteModel(true)
                                                }}
                                            />
                                                <Edit onClick={() =>getModelById(res._id)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {/* <Box sx={{ m: 1 }} className='d-flex justify-content-end'>
                        <select className="me-2" onChange={(e) => setCountPerPage(e.target.value * 1)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                        <Pagination
                            pageSize={countPerPage}
                            onChange={updatePage}
                            current={currentPage}
                            total={allData.length}
                            style={{ color: 'green' }}
                        />
                    </Box> */}
                </Box>
                : null}

        </>
    );
}
