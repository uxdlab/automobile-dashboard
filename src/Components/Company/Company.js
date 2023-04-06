import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useState } from "react";

export const Company = ({ companyData, allModels, previousModel }) => {

    console.log(allModels)
    console.log(previousModel)
    const [addedModels, setAddedModels] = useState(allModels.filter(e => previousModel.state.includes(e._id)))
    function modelChange(event) {
        const {
            target: { value },
        } = event;
        setAddedModels(value)
        previousModel.setState(value.map(e => e._id))
        companyData.current.company_model = value.map(e => e._id)
    }

    return (
        <>
            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Brand Name :</label><br />
                    <input
                        onChange={(e) => companyData.current.company_name = e.target.value}
                        defaultValue={companyData.current.company_name} required
                        className="form-control w-100"
                    />
                </Grid>
                <Grid item xs={6} className="px-3 mt-2">
                    <label>Select Model :</label><br />
                    <FormControl className="form-control" sx={{ height: '30px' }}>
                        <InputLabel id="demo-multiple-checkbox-label">Select Model</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={addedModels}
                            onChange={modelChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.map(e => e.model_name
                            ).join(', ')}
                        >
                            {allModels.map((name) => (
                                <MenuItem key={name.model_name
                                } value={name}>
                                    <Checkbox checked={previousModel.state.indexOf(name._id) !== -1} />
                                    <ListItemText primary={name.model_name
                                    } />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
        </>
    )
}