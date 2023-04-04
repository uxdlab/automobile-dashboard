import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Triangle } from 'react-loader-spinner'
import { Product } from "./Product";
import { ProductClass } from "../../services/Product";

export const EditProduct = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getProduct()
    }, [])

    let allProducts = useRef([])


    async function getProduct() {
        ProductClass.getProduct(id)
            .then((res) => {
                console.log(res.data.data)
                allProducts.current[0] = res.data.data
                setLoader(false)
            })
            .catch(err => console.log(err))
    }


    const formSubmit = async (e) => {
        e.preventDefault()
        // setLoader(true)

        let { product_icon, product_name } = allProducts.current[0]
        console.log(product_icon)
        console.log(product_name)
        // VehicleClass.editVehicle(id, { vehicle_description, vehicle_icon, vehicle_name })
        //     .then((res) => {
        //         console.log(res)
        //         setLoader(false)
        //         navigate('/')
        //     })
        //     .catch(err => console.log(err))
    }



    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Edit Product</Typography>

            {loader ? <Backdrop
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
            </Backdrop> :
                <Box>

                    <form onSubmit={formSubmit}>
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
                            <Button className="cancel_btn me-3" onClick={() => navigate('/products')}>Cancel</Button>
                            <Button type="submit" variant="contained">Save</Button>
                        </Box>
                    </form>
                </Box>}

        </>
    )
}