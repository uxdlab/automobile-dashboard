import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { editItem, getItem } from '../../services/Item'
import { Backdrop, Box, Button, Grid, Typography } from '@mui/material'
import { Triangle } from 'react-loader-spinner'
import Product from './Product'

export default function UpdateProduct() {
    const { id } = useParams()
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const [productData, setProductData] = useState({})
    const AllProducts = useRef([])


    const getProductById = () => {
        getItem(id)
            .then((res) => {
                console.log(res)
                AllProducts.current[0] = res.data.data
                setProductData(res.data.data)
                setLoader(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        console.log(AllProducts.current[0])
        editItem(id, AllProducts.current[0])
            .then((res) => {
                console.log(res)
                navigate('/product')
            }).catch((err) => {
                console.log(err)
            })

    }
    useEffect(() => {
        getProductById()
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
            <Typography variant="h4" className='text-center' mx={2} mt={2}>Edit Product</Typography>
            {!loader ?
                <Box>
                    <form onSubmit={formSubmit}>
                        {AllProducts.current.map((res, index) => {
                            return <Product
                                productData={productData}
                                AllProducts={AllProducts}
                                index={index}

                            />
                        })}
                        <Grid container>
                            <Grid item xl={7} md={9} sm={12} sx={12}>
                                <Box align='right' px={3} mt={6}>
                                    <Button className="cancel_btn me-3" onClick={() => navigate('/product')}>Cancel</Button>
                                    <Button type='submit' variant="contained">Update</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                : null}

        </>
    )
}
