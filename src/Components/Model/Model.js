import { Grid } from "@mui/material";
import React from "react";

export const Model = ({ modelData }) => {
    return (
        <>
            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Model Name :</label><br />
                    <input
                        onChange={(e) => modelData.current.model_name = e.target.value}
                        defaultValue={modelData.current.model_name} required
                        className="form-control w-100"
                    />
                </Grid>



            </Grid>
        </>
    )
}