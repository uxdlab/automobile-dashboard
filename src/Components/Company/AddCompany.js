
import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Company } from "./Company";

export const AddCompany = () => {
    let navigate = useNavigate()

    let companyData = useRef({ company_name: '' })




    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Add Company</Typography>
            <Company companyData={companyData} />
            <Box align='right' px={3} mt={6}>
                <Button className="cancel_btn me-3" onClick={() => navigate('/company')}>Cancel</Button>
                <Button type='submit' variant="contained">Save</Button>
            </Box>
        </>
    )
}