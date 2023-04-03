import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { VehicleClass } from "../../services/Vehicle";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ProductClass } from "../../services/Product";

export const ViewProduct = () => {

    let { id } = useParams()
    const [loader, setLoader] = useState(true)
    const [productData, setProductData] = useState({})
    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {
        ProductClass.getProduct(id)
            .then(res => {
                console.log(res)
                setLoader(false)
                setProductData(res.data.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Link to='/'>

                <Button>Back</Button>
            </Link>
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
            {loader ? null :
                <Box p={15}>

                    <Typography><b>Product Name :</b> {productData.product_name}</Typography>
                    <Typography><b>Product Icon :</b> {productData.product_icon}</Typography>

                </Box>
            }


        </>
    )
}