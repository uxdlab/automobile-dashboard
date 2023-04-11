import { Box, Grid } from '@mui/material'
import React from 'react'

export default function Product({AllProducts,index,productData}) {
    console.log(productData)
  return (
    <>
    <Grid container>
            <Grid item xl={7} md={9} sm={12} sx={12}>
            <Box>
            <Grid container mt={2}>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>Product Name :</label><br />
                    <input type='text' placeholder='Enter Product Name' onChange={(e)=>AllProducts.current[index].spare_partname = e.target.value} defaultValue={productData?productData.spare_partname:''} required className="form-control w-100" />
                </Grid>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>OE Reference Number :</label><br />
                    <input type='text' placeholder='Enter OE Reference Number' onChange={(e)=>AllProducts.current[index].oe_reference_number = e.target.value} defaultValue={productData?productData.oe_reference_number:''} required className="form-control w-100" />
                </Grid>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>KE Part Number :</label><br />
                    <input type='text' placeholder='Enter KE Part Number' onChange={(e)=>AllProducts.current[index].ke_partNumber = e.target.value} defaultValue={productData?productData.ke_partNumber:''} required className="form-control w-100" />
                </Grid>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>Product MRP(₹) :</label><br />
                    <input type='number' placeholder='Enter In Rupees' onChange={(e)=>AllProducts.current[index].MRP = e.target.value} defaultValue={productData?productData.MRP:''} required className="form-control w-100" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="px-3 mt-2">
                    <label>Product Description :</label><br />
                    <textarea required placeholder='Enter Product Description' onChange={(e)=>AllProducts.current[index].sparePart_description = e.target.value} defaultValue={productData?productData.sparePart_description:''} className="form-control w-100" rows='5' />
                </Grid>

            </Grid>

        </Box >
            </Grid>
        </Grid>
    </>
  )
}
