import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Triangle } from "react-loader-spinner";
import { Product } from "./Product";
import { ProductClass } from "../../services/Product";

export const AddProduct = () => {

    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const allProducts = useRef([
        {
            product_name: '',
            product_icon: '',
        }
    ])

    const submitForm = async (e) => {
        e.preventDefault()
        // setLoader(true)
        console.log(allProducts)

        ProductClass.addProduct(allProducts.current[0])
            .then(res => {
                setLoader(false)
                navigate('/products')
                console.log(res.data.data)
            })
            .catch(err => {
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

            <Typography align="center" variant="h4" mt={2}>Add Product</Typography>

            <form onSubmit={submitForm}>
                {allProducts.current.map((pro, index) => {
                    return (

                        <Product
                            key={index}
                            allProducts={allProducts}
                            productData={pro}
                            index={index} />
                    )
                })}

                <Box align='right' px={3} mt={6}>
                    <Button className="cancel_btn me-3" onClick={() => navigate('/')}>Cancel</Button>
                    <Button type='submit' variant="contained">Save</Button>
                </Box>
            </form>

        </>
    )
}

