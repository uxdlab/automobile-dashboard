import { Backdrop, Box, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useState } from "react";

export const Vehicle = ({ vehicleData, index, allVehicles, allProducts, previousProduct }) => {


    const [addedProducts, setAddedProducts] = useState(allProducts.filter(e => previousProduct.state.includes(e._id)))
    function productChange(event) {
        const {
            target: { value },
        } = event;
        setAddedProducts(value)
        previousProduct.setState(value.map(e => e._id))
        allVehicles.current[index].vehicle_product = value.map(e => e._id)
    }

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

                <Grid item xs={6} className="px-3 mt-2">
                    <label>Vehicle Description :</label><br />
                    <textarea defaultValue={vehicleData.vehicle_description} onChange={(e) => allVehicles.current[index].vehicle_description = e.target.value} required className="form-control w-100" />
                </Grid>

                <Grid item xs={6} className="px-3 mt-2">
                    <label>Vehicle Description :</label><br />
                    <FormControl className="form-control" sx={{ height: '30px' }}>
                        <InputLabel id="demo-multiple-checkbox-label">Select Product</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={addedProducts}
                            onChange={productChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.map(e => e.product_name).join(', ')}
                        >
                            {allProducts.map((name) => (
                                <MenuItem key={name.product_name} value={name}>
                                    <Checkbox checked={previousProduct.state.indexOf(name._id) !== -1} />
                                    <ListItemText primary={name.product_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

        </Box >
    )
}