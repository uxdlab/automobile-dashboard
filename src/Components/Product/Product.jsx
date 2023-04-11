import { Box, Grid } from '@mui/material'
import React from 'react'

export default function Product({AllProducts,ProductData,index}) {
  return (
    <>
    <Grid container>
            <Grid item xl={7} md={9} sm={12} sx={12}>
            <Box>
            <Grid container mt={2}>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>Category Name :</label><br />
                    <input type='text' onChange={(e)=>AllProducts.current[index].spare_partname = e.target.value} required className="form-control w-100" />
                </Grid>
                <Grid item md={6} sm={6} xs={12} className="px-3 mt-2">
                    <label>Product MRP :</label><br />
                    <input type='number' onChange={(e)=>AllProducts.current[index].MRP = e.target.value} required className="form-control w-100" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="px-3 mt-2">
                    <label>Product Description :</label><br />
                    <textarea required onChange={(e)=>AllProducts.current[index].sparePart_description = e.target.value} className="form-control w-100" rows='5' />
                </Grid>

            </Grid>

        </Box >
            </Grid>
        </Grid>
    </>
  )
}
