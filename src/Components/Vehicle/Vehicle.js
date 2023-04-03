import { Box, Grid } from "@mui/material";
import React from "react";

export const Vehicle = () => {
    return (
        <Box>

            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Vehicle Name :</label><br />
                    <input className="form-control w-100" />
                </Grid>

                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Vehicle Icon :</label><br />
                    <input className="form-control w-100" />
                </Grid>

                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Vehicle Description :</label><br />
                    <input className="form-control w-100" />
                </Grid>
            </Grid>

        </Box >
    )
}