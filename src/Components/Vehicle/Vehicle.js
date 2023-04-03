import { Box, Grid } from "@mui/material";
import React from "react";

export const Vehicle = ({ vehicleData, index, allVehicles }) => {
    return (
        <Box>

            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Vehicle Name :</label><br />
                    <input onChange={(e) => allVehicles.current[index].vehicle_name = e.target.value} defaultValue={vehicleData.vehicle_name} required className="form-control w-100" />
                </Grid>

                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Vehicle Icon :</label><br />
                    <input defaultValue={vehicleData.vehicle_icon} onChange={(e) => allVehicles.current[index].vehicle_icon = e.target.value} required className="form-control w-100" />
                </Grid>

                <Grid item xs={12} className="px-3 mt-2">
                    <label>Vehicle Description :</label><br />
                    <textarea defaultValue={vehicleData.vehicle_description} onChange={(e) => allVehicles.current[index].vehicle_description = e.target.value} required className="form-control w-100" />
                </Grid>
            </Grid>

        </Box >
    )
}