
import React, { useEffect, useRef, useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Backdrop, Box, Button, Dialog, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import "rc-pagination/assets/index.css";
import { ModelClass } from "../../services/Model";
import { Delete, Edit } from "@mui/icons-material";
import { Triangle } from "react-loader-spinner";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";
import { VehicleClass } from "../../services/Vehicle";
import { CompanyClass } from "../../services/Company";

export const ModelListing = () => {
    const theme = useTheme();
    const [loader, setLoader] = useState(true)
    const [selectSegment, setSelectSegment] = useState([])
    const [selectBrand, setSelectBrand] = useState([])
    console.log(selectSegment)
    console.log(selectBrand)
    const [allData, setData] = useState([])
    const [countPerPage, setCountPerPage] = useState(5);
    const [value, setValue] = React.useState("");
    const [deleteModel, setDeleteModel] = useState(false)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [deleteMod, setDeletedMod] = useState({ id: '', index: '', icon: '' })
    const [allSegment, setSegment] = useState([])
    const [allBrand, setAllBrand] = useState([])
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [localImg, setLocalImg] = useState()
    console.log(localImg)
    const [img, setImg] = useState({})
    console.log(img)
    const [imgURL, setImgURL] = useState('')
    const [id, setId] = useState('')
    let modelData = useRef(
        {
            model_name: '',
            model_description: '',
            model_segment_array: [],
            model_brand_array: [],
            model_icon: ''
        }
    )

    const [collection, setCollection] = React.useState(
        (allData.slice(0, countPerPage))
    );
    useEffect(() => {
        getAllModels()
        getAllSegment()
        getAllBrand()
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
        if (deleteMod.icon !== '') {
            const storage = getStorage();
            const desertRef = ref(storage, deleteMod.icon);
            deleteObject(desertRef)
                .then(() => {
                    console.log("image deleted");
                    ModelClass.deleteModel(deleteMod.id)
            .then(res => {
                console.log(res)
                getAllModels()
            })
            .catch(err => console.log(err))
                })
                .catch((error) => { });

        } else {
            ModelClass.deleteModel(deleteMod.id)
            .then(res => {
                console.log(res)
                getAllModels()
            })
            .catch(err => console.log(err))
        }
        setSelectSegment([])
        setSelectBrand([])

    }


    async function addModel(e) {
        e.preventDefault()
        console.log(modelData.current)
        setLoader(true)
        setOpen(false)
        modelData.current.model_segment_array = selectSegment
        modelData.current.model_brand_array = selectBrand
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
                        modelData.current.model_icon = url
                        console.log(modelData.current)

                        ModelClass.addModel(modelData.current)
                            .then((res) => {
                                console.log(res)
                                setLoader(false)
                                getAllModels()
                            }).catch((err) => {
                                console.log(err)
                                getAllModels()
                            })
                    });
                })
        } else {
            modelData.current.model_icon = ''
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
        setLocalImg('')
        setImg({})
        modelData.current.model_icon = ''
        setSelectSegment([])
        setSelectBrand([])
    }

    async function updateModel(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        modelData.current.model_segment_array = selectSegment
        modelData.current.model_brand_array = selectBrand
        if (img.name !== undefined) {
            if (modelData.current.model_icon !== '') {
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
                                    modelData.current.model_icon = url
                                    // console.log(brandData.current.brand_image)
                                    ModelClass.editModel(id, modelData.current)
                                    .then((res) => {
                                        console.log(res)
                                        setLoader(false)
                                        getAllModels()
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
                            modelData.current.model_icon = url
                            ModelClass.editModel(id, modelData.current)
                            .then((res) => {
                                console.log(res)
                                setLoader(false)
                                getAllModels()
                            }).catch((err) => {
                                console.log(err)
                                setLoader(false)
                            })
                        });
                    })
            }

        } else {
            console.log(modelData.current)
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
        setLocalImg('')
        setImg({})
        setSelectSegment([])
        setSelectBrand([])

       
    }

    async function getModelById(idd,icon) {
        setLoader(true)
        setImgURL(icon)
        setId(idd)
        ModelClass.getModel(idd)
            .then((res) => {
                console.log(res)
                modelData.current = res.data.data[0]
                if (modelData.current.model_icon) {
                    console.log(modelData.current.model_icon)
                    setLocalImg(modelData.current.model_icon)
                }
                setSelectSegment(modelData.current.model_segment_array)
                setSelectBrand(modelData.current.model_brand_array)
                setLoader(false)
                setOpen1(true)
            }).catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }

    async function getAllSegment() {
        VehicleClass.getAllVehicles()
            .then((res) => {
                console.log(res.data.data)
                setSegment(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    async function getAllBrand() {
        CompanyClass.getAllCompany()
            .then((res) => {
                console.log(res.data.data)
                setAllBrand(res.data.data)
            }).catch((err) => {
                console.log(err)
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
            <h1 className="mt-2 fs-2 mx-3">Models</h1>
            <Box align='right' className='px-3 pb-3'>
                <Button className="btn_primary" onClick={() => setOpen(true)} variant="contained">Add Model</Button>
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

            {/* Add Model Dialog Box */}
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
            >
                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Add New Model</h5>
                    <hr />
                    <form onSubmit={addModel}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-6">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Segment:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        onChange={(e)=>setSelectSegment([e.target.value])}
                                    >
                                        {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-6 col-sm-16 col-6">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Brand:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        onChange={(e)=>setSelectBrand([e.target.value])}
                                        
                                    >
                                        {allBrand.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.brand_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Model Name:</b></small></div>
                                    <input type='text' onChange={(e) => modelData.current.model_name = e.target.value} placeholder="Enter Model Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Model Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        onChange={(e) => modelData.current.model_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Add Model Icon:</b></small></div>
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

            {/* Edit Brand Dialog Box */}
            <Dialog
                open={open1}
                maxWidth={'xs'}
                fullWidth={true}
            >

                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Edit Model</h5>
                    <hr />
                    <form onSubmit={updateModel}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Segment:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        defaultValue={selectSegment[0]}
                                        onChange={(e)=>setSelectSegment([e.target.value])}
                                    >
                                        {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-6">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Brand:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        defaultValue={selectBrand[0]}
                                        onChange={(e)=>setSelectBrand([e.target.value])}
                                    >
                                        {allBrand.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.brand_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Model Name:</b></small></div>
                                    <input type='text' onChange={(e) => modelData.current.model_name = e.target.value} defaultValue={modelData.current.model_name} placeholder="Enter Model Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Model Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        defaultValue={modelData.current.model_description}
                                        onChange={(e) => modelData.current.model_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Update Brand Icon:</b></small></div>
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

            {!loader ?
                <Box sx={{ mx: 2 }} className='border'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="w-5"><b>S.No</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allData.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{res.model_name}</TableCell>
                                        <TableCell>
                                            {/* <RemoveRedEye onClick={() => navigate(`/model/${res._id}`)} /> */}
                                            <Delete
                                            className="pointer"
                                                onClick={() => {
                                                    setDeletedMod({ id: res._id, index ,icon:res.model_icon})
                                                    setDeleteModel(true)
                                                }}
                                            />
                                            <Edit className="pointer" onClick={() => getModelById(res._id,res.model_icon)} />
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
