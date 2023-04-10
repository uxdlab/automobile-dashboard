import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Triangle } from "react-loader-spinner";
import { Product } from "./CategoryDesign";
import { ProductClass } from "../../services/Product";
import { CompanyClass } from "../../services/Company";

export const AddProduct = () => {

    let navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    const [allCompany, setAllCompany] = useState([])
    const [selectedCompany, setSelectedCompany] = useState([])
    const allProducts = useRef([
        {
            product_name: '',
            product_icon: '',
            product_company: []
        }
    ])

    useEffect(() => {
        getAllCompany()
    }, [])

    function getAllCompany() {
        setLoader(true)
        CompanyClass.getAllCompany()
            .then(res => {
                console.log(res.data.data)
                setAllCompany(res.data.data)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }


    const submitForm = async (e) => {
        e.preventDefault()
        console.log(allProducts.current[0])
        ProductClass.addProduct(allProducts.current[0])
            .then(res => {
                setLoader(false)
                navigate('/products')
                console.log(res.data.data)

                setLoader(false)
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

            <Typography variant="h4" mx={2} mt={2}>Add Category</Typography>
            {!loader ?

                <form onSubmit={submitForm}>
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
                    <Box align='right' px={3} mt={6}>
                        <Button className="cancel_btn me-3" onClick={() => navigate('/')}>Cancel</Button>
                        <Button type='submit' variant="contained">Save</Button>
                    </Box>
                </form>

                : null}

        </>
    )
}

