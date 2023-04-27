import { Backdrop, Box, Grid, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apis } from '../../auth/api'
import { ProductClass } from '../../services/Product'
import { getAllManufacturers } from '../../services/Manufacture'
import { CallMultipleApi } from '../../services/CallMultipleApi'
import { Triangle } from 'react-loader-spinner'

export default function Product({ AllProducts, index, productData }) {
    const [segment, setSegment] = useState([])
    const [loader, setLoader] = useState(true)
    const [brand, setBrand] = useState([])
    const [model, setModel] = useState([])
    const [selectBrand, setSelectBrand] = useState([])
    const [selectModel, setSelectModel] = useState([])
    const [category, setCategory] = useState([])
    const [manufacturer, setManufacturer] = useState([])

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
            {!loader ? <Grid container>
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
                                    required
                                    // defaultValue={selectSegment[0]}
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
                                    required
                                    // defaultValue={selectSegment[0]}
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
                                    required
                                // defaultValue={selectSegment[0]}
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
            </Grid> : ''}
        </>
    )
}
