
import { Backdrop, Box, Button, Dialog, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { CompanyClass } from "../../services/Company";
import { Delete, Edit } from "@mui/icons-material";
import { VehicleClass } from "../../services/Vehicle";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/Firebase";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';


export const BrandListing = () => {
    const theme = useTheme();
    const [loader, setLoader] = useState(true)
    const [allCompanies, setCompanies] = useState([])
    const [allSegment, setSegment] = useState([])
    const [deleteModel, setDeleteModel] = useState(false)
    const [deletedComp, setDeletedComp] = useState({ id: '', index: '', icon: '' })
    const [selectSegment, setSelectSegment] = useState([])
    console.log(selectSegment)
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
    // brandData.current.segment_array = selectSegment
    console.log(brandData.current)
    useEffect(() => {
        getAllCompany()
        getAllSegment()
    }, [])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, selectSegment, theme) {
        return {
            fontWeight:
                selectSegment.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event) => {
        console.log(event)
        const {
            target: { value },
        } = event;
        setSelectSegment(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


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
        brandData.current.segment_array = selectSegment
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
        setSelectSegment([])

    }

    async function updateBrand(e) {
        e.preventDefault()
        setLoader(true)
        setOpen1(false)
        console.log(imgURL)
        brandData.current.segment_array = selectSegment
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
                                    console.log(brandData.current.brand_image)
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
        setSelectSegment([])
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
                setSelectSegment(brandData.current.segment_array)
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
                maxWidth={'xs'}
                fullWidth={true}
            >
                <Box py={2} px={1} className='over-flow-hide-x'>
                    <h5 className="px-3">Add New Brand</h5>
                    <hr />
                    <form onSubmit={addBrand}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Segment:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        required
                                        value={selectSegment}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                                style={getStyles(item.vehicle_name, selectSegment, theme)}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Brand Name:</b></small></div>
                                    <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Brand Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        onChange={(e) => brandData.current.brand_description = e.target.value}
                                        rows='3'
                                        placeholder='Enter Description'

                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Add Brand Icon:</b></small></div>
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
                    <h5 className="px-3">Edit Segment</h5>
                    <hr />
                    <form onSubmit={updateBrand}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Select Segment:</b></small></div>
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={selectSegment}
                                        onChange={(e)=>{
                                            handleChange(e)
                                        }}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                                style={getStyles(item.vehicle_name, selectSegment, theme)}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b><span className='text-danger'>*</span>Brand Name:</b></small></div>
                                    <input type='text' onChange={(e) => brandData.current.brand_name = e.target.value} defaultValue={brandData.current.brand_name} placeholder="Enter Brand Name" className="form-control w-100 mb-2" />
                                </div>
                                <div className="col-md-12">
                                    <div className="py-2"><small><b>Brand Description:</b></small></div>
                                    <textarea
                                        className="w-100 form-control"
                                        defaultValue={brandData.current.brand_description}
                                        onChange={(e) => brandData.current.brand_description = e.target.value}
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
                                        setOpen(false)
                                        setLocalImg('')
                                    }}>Cancel</span>
                                    <button className="btn custom-btn py-1 px-3" type="submit">Update</button>
                                </Box>
                            </div>
                        </div>
                    </form>
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
