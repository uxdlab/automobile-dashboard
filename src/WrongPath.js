import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const WrongPath = () => {
    return (
        <>
            <Typography variant="h2">This page is under development</Typography>
            <Link to='/'>Home</Link>
        </>
    )
}