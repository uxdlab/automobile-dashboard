import React, { useRef, useState } from 'react'
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Triangle } from "react-loader-spinner";
import Product from './Product';
import { addItem } from '../../services/Item';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../auth/Firebase';


export default function AddProduct() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [files, setFiles] = useState([])
    const [forUpload, setForUpload] = useState([])
    const AllProducts = useRef([
        {
            product_name: '',
            oe_reference_number: '',
            product_description: '',
            MRP: '',
            ke_partNumber: '',
            image: [],
            product_segment_aaray: [],
            product_brand_aaray: [],
            product_model_aaray: [],
            product_category_aaray: [],
            product_manufacture_aaray: []
        }
    ])

    const submitForm = async (e) => {
        e.preventDefault()
        const promises = []
        setLoader(true)
        console.log(files)
        if (files.length !== 0) {
            files.map((item) => {
                const storageRef = ref(storage, `image${Math.random()}${item.name}`);
                const uploadTask = uploadBytesResumable(storageRef, item);
                promises.push(uploadTask)
            })
            Promise.all(promises)
                .then((res) => {
                    console.log(res)
                    let urls = []
                    res.map((res2, index) => {
                        getDownloadURL(res2.ref).then((url) => {
                            console.log(url)
                            urls.push(url)
                            if (index == res.length - 1) {
                                console.log(urls)
                                AllProducts.current[0].image = [...urls]
                                console.log(AllProducts.current.image)
                                addItem(AllProducts.current[0])
                                .then((res) => {
                                    console.log(res)
                                    setLoader(false)
                                    navigate('/product')
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        })
                    })
                }).catch((err) => console.log(err))

        } else {
            addItem(AllProducts.current[0])
                .then((res) => {
                    console.log(res)
                    setLoader(false)
                    navigate('/product')
                }).catch((err) => {
                    console.log(err)
                })
        }
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

            <Typography variant="h4" className='text-center' mx={2} mt={2}>Add Product</Typography>
            {!loader ?

                <form onSubmit={submitForm}>
                    {AllProducts.current.map((pro, index) => {
                        return (
                            <Product
                                files={files}
                                setFiles={setFiles}
                                key={index}
                                AllProducts={AllProducts}
                                index={index}
                            />

                        )
                    })}

                    <Grid container className='d-flex justify-content-center pb-5'>
                        <Grid item xl={5} md={6} sm={12} sx={12}>
                            <Box align='right' mt={6}>
                                <Button className="cancel_btn me-3" onClick={() => navigate('/category')}>Cancel</Button>
                                <Button type='submit' variant="contained">Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>

                : null}

        </>
    )
}
