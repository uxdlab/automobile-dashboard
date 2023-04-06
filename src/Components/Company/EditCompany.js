import React, { useEffect, useRef, useState } from "react";
import { Company } from "./Company";
import { useNavigate, useParams } from "react-router";
import { CompanyClass } from "../../services/Company";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { ModelClass } from "../../services/Model";

export const EditCompany = () => {
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
                navigate('/company')
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
            <Typography align="center" variant="h4" mt={2}>Edit Brand</Typography>

            {!loader ?
                <Box>
                    <form onSubmit={formSubmit}>
                        <Company
                            companyData={companyData}
                            allModels={allModels}
                            previousModel={{ state: selectedModel, setState: setSelectedModel }}
                        />
                        <Box align='right' px={3} mt={6}>
                            <Button className="cancel_btn me-3" onClick={() => navigate('/company')}>Cancel</Button>
                            <Button type='submit' variant="contained">Save</Button>
                        </Box>
                    </form>
                </Box>
                : null}


        </>
    )
}