import React, { useEffect, useRef, useState } from "react";
import { Company } from "./Company";
import { useNavigate, useParams } from "react-router";
import { CompanyClass } from "../../services/Company";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";

export const EditCompany = () => {

    const { id } = useParams()
    let companyData = useRef({ company_name: '' })
    const [loader, setLoader] = useState(true)
    let navigate = useNavigate()
    useEffect(() => {
        getCompany()
    }, [])
    function getCompany() {
        CompanyClass.getCompany(id)
            .then(res => {
                setLoader(false)
                console.log(res.data.data)
                companyData.current.company_name = res.data.data[0].company_name
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
            <Typography align="center" variant="h4" mt={2}>Edit Company</Typography>

            {!loader ?
                <Box>
                    <form onSubmit={formSubmit}>
                        <Company companyData={companyData} />
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