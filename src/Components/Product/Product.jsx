import { Backdrop, Box, Grid, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { apis } from '../../auth/api'
import { CallMultipleApi } from '../../services/CallMultipleApi'
import { Triangle } from 'react-loader-spinner'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Product({ AllProducts, index, productData,files,setFiles }) {
    const [loader, setLoader] = useState(true)
    const [segment, setSegment] = useState([])
    const [brand, setBrand] = useState([])
    const [model, setModel] = useState([])
    const [selectBrand, setSelectBrand] = useState([])
    const [selectModel, setSelectModel] = useState([])
    const [category, setCategory] = useState([])
    const [manufacturer, setManufacturer] = useState([])
    console.log(productData)
    const [imgURLs,setimgURLs] = useState([])
    console.log(files)
    console.log(imgURLs)

    function filterd(fil) {
        AllProducts.current[index].product_segment_aaray = [fil]
        let newArr = []
        brand.map((res) => {
            res.segment_array.map((res2) => {
                if (res2 == fil) {
                    newArr.push(res)
                }
            })
        })
        setSelectBrand([...newArr])
    }

    function filteredModel(fil) {
        AllProducts.current[index].product_brand_aaray = [fil]
        let newArr = []
        model.map((res) => {
            res.model_brand_array.map((res2) => {
                if (res2 == fil) {
                    newArr.push(res)
                }
            })
        })
        setSelectModel([...newArr])
    }

    const imgPrev = (imgs) => {
        console.log('okkkkkkkkkkkkkkkkkkkkkkk')
        setFiles(imgs)
        console.log(imgs)
        let arr = []
        imgs.map((item)=>{
                let url = URL.createObjectURL(item)
                arr.push(url)
                console.log(url)
        })
        setimgURLs([...imgURLs,...arr])
        
    }


    useEffect(() => {
        CallMultipleApi.CallMultipleApi([
            `${apis.getAllData}`,
            `${apis.product.getAll}`,
            `${apis.manufacture.getAll}`,
        ])
            .then((res) => {
                console.log(res)
                setSegment(res[0].data.data.segmentData)
                setBrand(res[0].data.data.brandData)
                setModel(res[0].data.data.modelData)
                setCategory(res[1].data.data)
                setManufacturer(res[2].data.data)
                console.log(res[1].data.data)
                setLoader(false)
            })
    }, [])
    return (
        <>
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
            {!loader ?
                <Grid container className='d-flex justify-content-center '>
                    <Grid item xl={5} md={6} sm={12} sx={12} className='border pb-3'>
                        <Box>
                            <Grid container mt={2}>
                                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
                                    <label>Product Name :</label><br />
                                    <input type='text' placeholder='Enter Product Name' onChange={(e) => AllProducts.current[index].product_name = e.target.value} defaultValue={productData ? productData[0].product_name : ''}  className="form-control w-100" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className="px-3 mt-2">
                                    <label>Product Description :</label><br />
                                    <textarea  placeholder='Enter Product Description' onChange={(e) => AllProducts.current[index].product_description = e.target.value} defaultValue={productData ? productData[0].product_description : ''} className="form-control w-100" rows='3' />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
                                    <label>OE Reference Number :</label><br />
                                    <input type='text' placeholder='Enter OE Reference Number' onChange={(e) => AllProducts.current[index].oe_reference_number = e.target.value} defaultValue={productData ? productData[0].oe_reference_number : ''}  className="form-control w-100" />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="px-3 mt-2">
                                    <label>KE Part Number :</label><br />
                                    <input type='text' placeholder='Enter KE Part Number' onChange={(e) => AllProducts.current[index].ke_partNumber = e.target.value} defaultValue={productData ? productData[0].ke_partNumber : ''}  className="form-control w-100" />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Product MRP(₹) :</label><br />
                                    <input type='number' placeholder='Enter In Rupees' onChange={(e) => AllProducts.current[index].MRP = e.target.value} defaultValue={productData ? productData[0].MRP : ''}  className="form-control w-100" />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Select Segment :</label><br />
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        
                                        defaultValue={productData ? productData[0].product_segment_aaray[0] : ''}
                                        onChange={(e) => filterd(e.target.value)}
                                    >
                                        {segment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Select Brand :</label><br />
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        
                                        defaultValue={productData ? productData[0].product_brand_aaray[0] : ''}
                                        onChange={(e) => filteredModel(e.target.value)}
                                    >
                                        {selectBrand.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.brand_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Select Model :</label><br />
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        
                                        defaultValue={productData ? productData[0].product_model_aaray[0] : ''}
                                        onChange={(e) => AllProducts.current[index].product_model_aaray = [e.target.value]}
                                    >
                                        {selectModel.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.model_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Select Category :</label><br />
                                    <Select
                                        className="select-style"
                                        fullWidth
                                        
                                        defaultValue={productData ? productData[0].product_category_aaray[0] : ''}
                                        onChange={(e) => AllProducts.current[index].product_category_aaray = [e.target.value]}
                                    >
                                        {category.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.category_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                    <label>Select Manufacturer :</label><br />


                                    <Select
                                        className="select-style"
                                        fullWidth
                                        defaultValue={productData ? productData[0].product_manufacture_aaray[0] : ''}
                                        onChange={(e) => AllProducts.current[index].product_manufacture_aaray = [e.target.value]}
                                    >
                                        {manufacturer.map((res, index) => {
                                            return (
                                                <MenuItem
                                                    value={res._id}
                                                >
                                                    {res.manufacturer_name}
                                                </MenuItem>
                                            )
                                        })}

                                    </Select>

                                </Grid>

                                <Grid item md={12} lg={12} sm={12} sx={12} className="px-3 mt-2">
                         
                                    <label>Add Product Images :</label><br />
                                    
                                    <div className='w-100 d-flex flex-wrap'>
                                        {
                                            imgURLs.map((item,index)=>
                                            <div key={index} className=" mb-1 pe-1 relative" style={{width:'25%'}}>
                                            <CancelIcon sx={{fontSize:'12px',color:'red'}} onClick={()=>{
                                                let arr = [...imgURLs]
                                                arr.splice(index, 1)
                                                setimgURLs(arr)
                                            }} className="close-btn-position" />
                                            <img className="img-style" src={item}/>
                                        </div>)
                                        }
                                        <div className="" style={{width:'25%'}}>
                                            <div className="btn img-btn w-100">
                                                <input type="file" multiple id="2actual-btn" hidden
                                                   onChange={(e)=>imgPrev(Object.values(e.target.files))}
                                                />
                                                <label className="text-center text-gray" htmlFor="2actual-btn">
                                                    <CloudUploadIcon /><br />
                                                    <span>Upload</span>
                                                </label>
                                            </div>
                                            </div>

                                    </div>
                                </Grid>


                            </Grid>

                        </Box >
                    </Grid>
                </Grid> : ''}
        </>
    )
}
