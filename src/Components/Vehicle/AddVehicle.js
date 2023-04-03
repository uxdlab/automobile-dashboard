import React, { useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { VehicleClass } from "../../services/Vehicle";
import { Vehicle } from "./Vehicle";
import { Triangle } from "react-loader-spinner";

export const AddVehicle = () => {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const allVehicles = useRef([
        {
            vehicle_name: '',
            vehicle_description: '',
            vehicle_icon: '',
        }
    ])

    const submitForm = async (e) => {
        e.preventDefault()
        setLoader(true)
        VehicleClass.addVehicle(allVehicles.current[0])
            .then(res => {
                setLoader(false)
                navigate('/')
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <Box>
                    <Triangle
                        height="80"
                        width="80"
                        color="black"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={loader}
                    />
                </Box>
            </Backdrop>

            <Typography align="center" variant="h4" mt={2}>Add Vehicle</Typography>

            <form onSubmit={submitForm}>
                {allVehicles.current.map((veh, index) => {
                    return (
                        <Vehicle
                            key={index}
                            allVehicles={allVehicles}
                            vehicleData={veh}
                            index={index} />
                    )
                })}

                <Box align='right' px={3} mt={6}>
                    <Button className="cancel_btn me-3" onClick={() => navigate('/')}>Cancel</Button>
                    <Button type='submit' variant="contained">Save</Button>
                </Box>
            </form>

        </>
    )
}