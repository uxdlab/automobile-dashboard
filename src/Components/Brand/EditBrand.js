import React, { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { useNavigate, useParams } from "react-router";
import { CompanyClass } from "../../services/Company";
import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { ModelClass } from "../../services/Model";

export const EditBrand = () => {
    let num = 0
    const { id } = useParams()
    let companyData = useRef({ company_name: '' })
    const [loader, setLoader] = useState(true)
    const [allModels, setAllModels] = useState([])
    const [selectedModel, setSelectedModel] = useState([])



    let navigate = useNavigate()
    useEffect(() => {
        getCompany()
        getAllModels()
    }, [])

    function getAllModels() {
        ModelClass.getAllModel()
            .then(res => {
                console.log(res.data.data)
                setAllModels(res.data.data)
                num++
                if (num == 2) {
                    setLoader(false)
                }
            })
            .catch(err => console.log(err))
    }

    function getCompany() {
        CompanyClass.getCompany(id)
            .then(res => {
                console.log(res.data.data)
                companyData.current = res.data.data[0]
                setSelectedModel(res.data.data[0].company_model)
                num++
                if (num == 2) {
                    setLoader(false)
                }
            })
            .catch(err => console.log(err))
    }

    function formSubmit(e) {
        setLoader(true)
        e.preventDefault()
        console.log(companyData)
        CompanyClass.editCompany(id, companyData.current)
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
            <Typography variant="h4" mx={2} mt={2}>Edit Brand</Typography>

            {!loader ?
                <Box>
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
                    </form>
                </Box>
                : null}


        </>
    )
}