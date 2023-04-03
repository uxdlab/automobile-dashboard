import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Vehicle } from "./Vehicle";
import { useNavigate, useParams } from "react-router";
import { VehicleClass } from "../../services/Vehicle";
import { Triangle } from 'react-loader-spinner'

export const EditVehicle = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getVehicle()
    }, [])

    let allVehicles = useRef([])


    async function getVehicle() {
        VehicleClass.getVehicle(id)
            .then((res) => {
                console.log(res.data.data)
                allVehicles.current[0] = res.data.data
                setLoader(false)
            })
            .catch(err => console.log(err))
    }


    const formSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)

        let { vehicle_description, vehicle_icon, vehicle_name } = allVehicles.current[0]

        VehicleClass.editVehicle(id, { vehicle_description, vehicle_icon, vehicle_name })
            .then((res) => {
                console.log(res)
                setLoader(false)
                navigate('/')
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <Typography align="center" variant="h4" mt={2}>Edit Vehicle</Typography>

            {loader ? <Backdrop
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
            </Backdrop> :
                <Box>

                    <form onSubmit={formSubmit}>
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
                            <Button type="submit" variant="contained">Save</Button>
                        </Box>
                    </form>
                </Box>}

        </>
    )
}