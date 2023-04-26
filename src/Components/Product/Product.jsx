import { Box, Grid, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apis } from '../../auth/api'

export default function Product({ AllProducts, index, productData }) {
   const [segment,setSegment] = useState([])
   const [brand,setBrand] = useState([])
   const [model,setModel] = useState([])
   const [selectSegment,setSelectSegment] = useState([])
   const [selectBrand,setSelectBrand] = useState([])
   const [selectModel,setSelectModel] = useState([])


   function getAll(){
    axios.get(`${apis.baseUrl}vehicle/getSegmentBrandModel/all`)
    .then((res)=>{
        console.log(res.data.data.brandData)
        setSegment(res.data.data.segmentData)
        setBrand(res.data.data.brandData)
        setModel(res.data.data.modelData)
    }).catch((err)=>{
        console.log(err)
    })
   }

   function filterd(fil){
    let newArr = []
    brand.map((res)=>{
        res.segment_array.map((res2)=>{
            if(res2 == fil){
                newArr.push(res)
            }
                    })
    })
    setSelectBrand([...newArr])
   }

   useEffect(()=>{
    getAll()
   },[])
    return (
        <>
            <Grid container>
                <Grid item xl={7} md={9} sm={12} sx={12}>
                    <Box>
                        <Grid container mt={2}>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>Select Sagment :</label><br />
                                <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        // defaultValue={selectSegment[0]}
                                        onChange={(e)=>filterd(e.target.value)}
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
                                        required
                                        // defaultValue={selectSegment[0]}
                                        // onChange={(e)=>setSelectSegment([e.target.value])}
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
                                        required
                                        // defaultValue={selectSegment[0]}
                                        // onChange={(e)=>setSelectSegment([e.target.value])}
                                    >
                                        {model.map((item, index) => (
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
                                        required
                                        // defaultValue={selectSegment[0]}
                                        // onChange={(e)=>setSelectSegment([e.target.value])}
                                    >
                                        {/* {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>Select Manufacturer :</label><br />
                                <Select
                                        className="select-style"
                                        fullWidth
                                        required
                                        // defaultValue={selectSegment[0]}
                                        // onChange={(e)=>setSelectSegment([e.target.value])}
                                    >
                                        {/* {allSegment.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                value={item._id}
                                            >
                                                {item.vehicle_name}
                                            </MenuItem>
                                        ))} */}
                                    </Select>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>Product Name :</label><br />
                                <input type='text' placeholder='Enter Product Name' onChange={(e) => AllProducts.current[index].product_name = e.target.value} defaultValue={productData ? productData.product_name : ''} required className="form-control w-100" />
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>OE Reference Number :</label><br />
                                <input type='text' placeholder='Enter OE Reference Number' onChange={(e) => AllProducts.current[index].oe_reference_number = e.target.value} defaultValue={productData ? productData.oe_reference_number : ''} required className="form-control w-100" />
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>KE Part Number :</label><br />
                                <input type='text' placeholder='Enter KE Part Number' onChange={(e) => AllProducts.current[index].ke_partNumber = e.target.value} defaultValue={productData ? productData.ke_partNumber : ''} required className="form-control w-100" />
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                                <label>Product MRP(₹) :</label><br />
                                <input type='number' placeholder='Enter In Rupees' onChange={(e) => AllProducts.current[index].MRP = e.target.value} defaultValue={productData ? productData.MRP : ''} required className="form-control w-100" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} className="px-3 mt-2">
                                <label>Product Description :</label><br />
                                <textarea required placeholder='Enter Product Description' onChange={(e) => AllProducts.current[index].product_description = e.target.value} defaultValue={productData ? productData.product_description : ''} className="form-control w-100" rows='5' />
                            </Grid>

                        </Grid>

                    </Box >
                </Grid>
            </Grid>
        </>
    )
}
