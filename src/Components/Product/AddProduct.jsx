import React, { useRef, useState } from 'react'
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Triangle } from "react-loader-spinner";
import Product from './Product';
import { addItem } from '../../services/Item';


export default function AddProduct() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const AllProducts = useRef([
        { 
                spare_partname:'',
                oe_reference_number:'',
                sparePart_description:'',
                MRP:'',
                ke_partNumber:'',
                image:{
                  fileName:'test',
                  fileUrl:'test'
                }
      }
    ])

    const submitForm = (e)=>{
        e.preventDefault()
        setLoader(true)
        addItem(AllProducts.current[0])
       .then((res)=>{
        console.log(res)
        setLoader(false)
        navigate('/product')
       }).catch((err)=>{
        console.log(err)
       })
    }
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

            <Typography variant="h4" mx={2} mt={2}>Add Product</Typography>
            {!loader ?

                <form onSubmit={submitForm}>
                    {AllProducts.current.map((pro, index) => {
                        return (
                            <Product
                            key={index}
                            AllProducts = {AllProducts}
                            index={index}
                            />

                        )
                    })}
                    <Box align='right' px={3} mt={6}>
                        <Button className="cancel_btn me-3" onClick={() => navigate('/category')}>Cancel</Button>
                        <Button type='submit' variant="contained">Save</Button>
                    </Box>
                </form>

                 : null} 

        </>
  )
}
