
import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Brand } from "./Brand";
import { CompanyClass } from "../../services/Company";
import { Triangle } from "react-loader-spinner";
import { ModelClass } from "../../services/Model";

export const AddBrand = () => {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    const [allModels, setAllModels] = useState([])
    const [selectedModel, setSelectedModel] = useState([])

    let companyData = useRef({ company_name: '' })
    useEffect(() => {
        getAllModels()
    }, [])

    function getAllModels() {
        ModelClass.getAllModel()
            .then(res => {
                console.log(res.data.data)
                setAllModels(res.data.data)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
    function formSubmit(e) {
        setLoader(true)
        e.preventDefault()
        console.log(companyData)
        CompanyClass.addCompany(companyData.current)
            .then(res => {
                console.log(res)
                setLoader(false)
                navigate('/brand')
            })
            .catch(err => console.log(err))
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
            <Typography variant="h4" mx={2} mt={2}>Add Brand</Typography>
            {!loader ?
                <form onSubmit={formSubmit}>

                    <Brand
                        companyData={companyData}
                        allModels={allModels}
                        previousModel={{ state: selectedModel, setState: setSelectedModel }}
                    />
                    <Grid container>
                        <Grid item xl={7} md={9} sm={12} sx={12}>
                            <Box align='right' px={3} mt={6}>
                                <Button className="cancel_btn me-3" onClick={() => navigate('/brand')}>Cancel</Button>
                                <Button type='submit' variant="contained">Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form> : null}
        </>
    )
}