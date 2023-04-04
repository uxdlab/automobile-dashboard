
import React from "react";
import { Model } from "./Model";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const AddModel = () => {
    let navigate = useNavigate()
    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Add Model</Typography>
            <Model />
            <Box align='right' px={3} mt={6}>
                <Button className="cancel_btn me-3" onClick={() => navigate('/models')}>Cancel</Button>
                <Button type='submit' variant="contained">Save</Button>
            </Box>
        </>
    )
}