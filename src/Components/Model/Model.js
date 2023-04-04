import { Grid } from "@mui/material";
import React from "react";

export const Model = () => {
    return (
        <>
            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Model Name :</label><br />
                    <input
                        //  onChange={(e) => allProducts.current[index].product_name = e.target.value}
                        //   defaultValue={productData.product_name} required
                        className="form-control w-100"
                    />
                </Grid>

                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Model:</label><br />
                    <input
                        //  defaultValue={productData.product_icon}
                        //   onChange={(e) => allProducts.current[index].product_icon = e.target.value}
                        required className="form-control w-100" />
                </Grid>


            </Grid>
        </>
    )
}