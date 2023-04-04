
import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Company } from "./Company";
import { CompanyClass } from "../../services/Company";
import { Triangle } from "react-loader-spinner";

export const AddCompany = () => {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)


    let companyData = useRef({ company_name: '' })

    function formSubmit(e) {
        setLoader(true)
        e.preventDefault()
        console.log(companyData)
        CompanyClass.addCompany(companyData.current)
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
            <Typography align="center" variant="h4" mt={2}>Add Company</Typography>
            <form onSubmit={formSubmit}>

                <Company companyData={companyData} />
                <Box align='right' px={3} mt={6}>
                    <Button className="cancel_btn me-3" onClick={() => navigate('/company')}>Cancel</Button>
                    <Button type='submit' variant="contained">Save</Button>
                </Box>
            </form>
        </>
    )
}