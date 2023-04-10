import { Box, Checkbox, FormControl, Grid, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useState } from "react";

export const Product = ({ productData, index, allProducts, allCompany, previousCompany }) => {

    const [addedCompany, setAddedCompany] = useState(allCompany.filter(e => previousCompany.state.includes(e._id)))

    function companyChange(event) {
        const {
            target: { value },
        } = event;

        setAddedCompany(value)
        previousCompany.setState(value.map(e => e._id))
        allProducts.current[index].product_company = value.map(e => e._id)
    }


    return (
        <Box>

            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Category Name :</label><br />
                    <input onChange={(e) => allProducts.current[index].product_name = e.target.value} defaultValue={productData.product_name} required className="form-control w-100" />
                </Grid>

                {/* <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Category Icon :</label><br />
                    <input defaultValue={productData.product_icon} onChange={(e) => allProducts.current[index].product_icon = e.target.value} required className="form-control w-100" />
                </Grid> */}
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Select Company :</label><br />
                    <FormControl className="form-control" >
                        <Select
                        sx={{ height: '38px' }}
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={addedCompany}
                            onChange={companyChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.map(e => e.company_name).join(', ')}
                        >
                            {allCompany.map((name) => (
                                <MenuItem key={name.company_name} value={name}>
                                    <Checkbox checked={previousCompany.state.indexOf(name._id) !== -1} />
                                    <ListItemText primary={name.company_name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>


            </Grid>

        </Box >
    )
}