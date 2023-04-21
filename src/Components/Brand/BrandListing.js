
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { VehicleClass } from "../../services/Vehicle";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";

export const BrandListing = () => {

    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    const [allCompanies, setCompanies] = useState([])
    const [allSegment, setSegment] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '', icon: '' })
    console.log(deletedComp.icon)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [localImg, setLocalImg] = useState()
    console.log(localImg)
    const [img, setImg] = useState({})
    console.log(img)
    const [imgURL, setImgURL] = useState('')
    const [id, setId] = useState('')
    let brandData = useRef({
        brand_name: '',
        brand_description: '',
        segment_array: [],
        brand_image: ''
    })
    useEffect(() => {
        getAllCompany()
        getAllSegment()
    }, [])
    function getAllCompany() {
        CompanyClass.getAllCompany()
            .then(res => {
                setLoader(false)
                setCompanies(res.data.data)
                console.log(res.data.data)
            })
    }
    function deleteCompany() {
        setDeleteModel(false)
        setLoader(true)
        console.log(deletedComp)
        if (deletedComp.icon !== '') {

            const storage = getStorage();
            const desertRef = ref(storage, deletedComp.icon);
            deleteObject(desertRef)
                .then(() => {
                    console.log("image deleted");
                    CompanyClass.deleteCompany(deletedComp.id)
                        .then(res => {
                            let arr = [...allCompanies]
                            arr.splice(deletedComp.index, 1)
                            setCompanies(arr)
                            setLoader(false)
                        })
                        .catch(err => console.log(err))
                })
                .catch((error) => { });

        } else {
            CompanyClass.deleteCompany(deletedComp.id)
                .then(res => {
                    let arr = [...allCompanies]
                    arr.splice(deletedComp.index, 1)
                    setCompanies(arr)
                    setLoader(false)
                })
                .catch(err => console.log(err))
        }

    }

    async function addBrand(e) {
        e.preventDefault()
        console.log(brandData.current)
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
                        brandData.current.brand_image = url
                        console.log(brandData.current)

                        CompanyClass.addCompany(brandData.current)
                            .then((res) => {
                                console.log(res)
                                setLoader(false)
                                getAllCompany()
                            }).catch((err) => {
                                console.log(err)
                                getAllCompany()
                            })

                    });
                })
        } else {
            brandData.current.brand_image = ''
            CompanyClass.addCompany(brandData.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllCompany()
                }).catch((err) => {
                    console.log(err)
                    getAllCompany()
                })
        }
        setLocalImg('')
        setImg({})
        brandData.current.brand_image = ''


    }

    async function updateBrand(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(id)
        if (img.name !== undefined) {
            if (brandData.current.brand_image !== '') {
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
                                    brandData.current.brand_image = url
                                    CompanyClass.editCompany(id, brandData.current)
                                        .then((res) => {
                                            console.log(res)
                                            setLoader(false)
                                            getAllCompany()
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
                            brandData.current.brand_image = url
                            CompanyClass.editCompany(id, brandData.current)
                                .then((res) => {
                                    console.log(res)
                                    setLoader(false)
                                    getAllCompany()
                                }).catch((err) => {
                                    console.log(err)
                                    setLoader(false)
                                })
                        });
                    })
            }

        } else {

            CompanyClass.editCompany(id, brandData.current)
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    getAllCompany()
                }).catch((err) => {
                    console.log(err)
                    setLoader(false)
                })
        }
        setLocalImg('')
        setImg({})

    }

    async function getBrandById(idd, icon) {
        setImgURL(icon)
        setLoader(true)
        setId(idd)
        CompanyClass.getCompany(idd)
            .then((res) => {
                console.log(res)
                brandData.current = res.data.data[0]
                if (brandData.current.brand_image) {
                    console.log(brandData.current.brand_image)
                    setLocalImg(brandData.current.brand_image)
                }
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
                        <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                        <Button variant="contained" onClick={deleteCompany}>Delete</Button>
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

            {/* Add Brand Dialog Box */}
            <Dialog
                open={open}
                maxWidth={'sm'}
                fullWidth={true}
            >
                <Box p={3}>
                    <Typography variant="h5" className="text-center mb-2">Add Brand</Typography>
                    <div className="container-fluid p-0 m-0">
                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="col-md-12">
                                    <div className="col-md-12"><small><b>Select Segment:</b></small></div>
                                    <div className="col-md-12" style={{ position: 'relative' }}>
                                        <KeyboardArrowDownIcon sx={{ position: 'absolute', right: '10px', top: '10px' }} />
                                        <select className="w-100 py-2 px-2 form-control border" onChange={(e) => brandData.current.segment_array = [e.target.value]} placeholder="Select Segment">
                                            <option disabled selected >Select Segment</option>
                                            {
                                                allSegment.map((item, index) => <option key={index} value={item._id}>{item.vehicle_name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-12"><small><b>Brand Name:</b></small></div>
                                    <div className="col-md-12">
                                        <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <small><b>Brand Description:</b></small>
                                    <textarea
                                        className="w-100 form-control"
                                        onChange={(e) => brandData.current.brand_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    /></div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12 text-center"><small><b>Add Icon</b></small></div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="border w-50 px-2 mb-2">
                                        <img className="w-100 h" src={localImg !== undefined && localImg ? localImg : 'https://cdn.iconscout.com/icon/free/png-256/photo-size-select-actual-1782180-1512958.png'} alt='' />
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
                                            onChange={(e) => {
                                                setImg(e.target.files[0])
                                                imgPrev(e.target.files[0])
                                            }}
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
                        <Button className='cancel_btn me-3' onClick={() => {
                            setOpen(false)
                            setLocalImg('')
                        }}>Cancel</Button>
                        <Button variant="contained" sx={{ background: '#534ba8' }} onClick={addBrand}>Add</Button>
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
                    <Typography variant="h5" className="text-center mb-2">Edit Brand</Typography>
                    <div className="container-fluid p-0 m-0">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-12"><small><b>Select Segment:</b></small></div>
                                <div className="col-md-12" style={{ position: 'relative' }}>
                                    <KeyboardArrowDownIcon sx={{ position: 'absolute', right: '10px', top: '10px' }} />
                                    <select className="w-100 py-2 px-2 form-control border" defaultValue={brandData.current.segment_array[0]} onChange={(e) => brandData.current.segment_array = [e.target.value]} placeholder="Select Segment">
                                        <option disabled selected >Select Segment</option>
                                        {
                                            allSegment.map((item, index) => <option key={index} value={item._id}>{item.vehicle_name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-md-12"><small><b>Brand Name:</b></small></div>
                                <div className="col-md-12">
                                    <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} defaultValue={brandData.current.brand_name} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <small><b>Segment Description:</b></small>
                                    <textarea
                                        className="w-100 form-control"
                                        defaultValue={brandData.current.brand_description}
                                        onChange={(e) => brandData.current.brand_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    /></div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12 text-center"><small><b>Add Icon</b></small></div>
                                <div className="col-md-12 d-flex justify-content-center py-2">
                                    <div className="border w-50 px-2">
                                        <img className="w-100 h" src={localImg !== undefined && localImg ? localImg : 'https://cdn.iconscout.com/icon/free/png-256/photo-size-select-actual-1782180-1512958.png'} alt='' />
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
                                            onChange={(e) => {
                                                setImg(e.target.files[0])
                                                imgPrev(e.target.files[0])
                                            }}
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
                        <Button className='cancel_btn me-3' onClick={() => {
                            setOpen1(false)
                            setLocalImg('')
                        }}>Cancel</Button>
                        <Button variant="contained" sx={{ background: '#534ba8' }} onClick={updateBrand}>Update</Button>
                    </Box>
                </Box>

            </Dialog>



            <h1 className="mt-2 fs-2 mx-3">Brands</h1>

            <Box align='right' className='px-3 pb-3'>
                <Button className="btn_primary" onClick={() => setOpen(true)} variant="contained">Add Brand</Button>
            </Box>
            <div className="px-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Sno.</b></TableCell>
                            <TableCell><b>Brand Name</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCompanies.map((res, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{res.brand_name}</TableCell>
                                    <TableCell>
                                        <Delete onClick={() => {
                                            setDeletedComp({ id: res._id, index, icon: res.brand_image })
                                            setDeleteModel(true)
                                        }} />
                                        <Edit onClick={() =>
                                            getBrandById(res._id, res.brand_image)} />
                                        {/* <RemoveRedEye sx={{cursor:'pointer'}}
                                        onClick={()=>{
                                            navigate('/viewBrand')
                                        }}
                                        /> */}

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
