import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Vehicle } from "./Vehicle";
import { useNavigate } from "react-router";

export const AddVehicle = () => {
    let navigate = useNavigate()
    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Add Vehicle</Typography>
            <Vehicle />

            <Box align='right' px={3} mt={6}>
                <Button className="cancel_btn me-3" onClick={() => navigate('/')}>Cancel</Button>
                <Button variant="contained">Save</Button>
            </Box>

        </>
    )
}