import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Triangle } from 'react-loader-spinner'
import { Product } from "./CategoryDesign";
import { ProductClass } from "../../services/Product";
import { CompanyClass } from "../../services/Company";

export const EditProduct = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const [loader, setLoader] = useState(true)
    const [allCompany, setAllCompany] = useState([])
    const [selectedCompany, setSelectedCompany] = useState([])

    let num = 0
    useEffect(() => {
        getProduct()
        getAllCompany()
    }, [])

    let allProducts = useRef([])
    function getAllCompany() {
        CompanyClass.getAllCompany()
            .then(res => {
                console.log(res.data.data)
                setAllCompany(res.data.data)
                num++
                if (num == 2) {
                    setLoader(false)
                }
            })
            .catch(err => console.log(err))
    }

    async function getProduct() {
        ProductClass.getProduct(id)
            .then((res) => {
                console.log(res.data.data)
                allProducts.current[0] = res.data.data
                setSelectedCompany(res.data.data.product_company)
                num++
                if (num == 2) {
                    setLoader(false)
                }

            })
            .catch(err => console.log(err))
    }


    const formSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        let { product_icon, product_name, product_company } = allProducts.current[0]
        ProductClass.editProduct(id, { product_icon, product_name, product_company })
            .then((res) => {
                console.log(res)
                setLoader(false)
                navigate('/products')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Typography variant="h4" mx={2} mt={2}>Edit Category</Typography>

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
                                    index={index}
                                    allCompany={allCompany}
                                    previousCompany={{ state: selectedCompany, setState: setSelectedCompany }}
                                />
                            )
                        })}
                        <Grid container>
                            <Grid item xl={7} md={9} sm={12} sx={12}>
                                <Box align='right' px={3} mt={6}>
                                    <Button className="cancel_btn me-3" onClick={() => navigate('/products')}>Cancel</Button>
                                    <Button type="submit" variant="contained">Save</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>}

        </>
    )
}