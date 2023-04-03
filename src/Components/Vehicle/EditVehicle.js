import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Vehicle } from "./Vehicle";
import { useNavigate } from "react-router";

export const EditVehicle = () => {
    let navigate = useNavigate()

    const formSubmit = async (e) => {
        e.preventDefault()
        alert('form submitted')
    }



    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Edit Vehicle</Typography>
            <form onSubmit={formSubmit}>

                <Vehicle />

                <Box align='right' px={3} mt={6}>
                    <Button className="cancel_btn me-3" onClick={() => navigate('/')}>Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </Box>
            </form>

        </>
    )
}