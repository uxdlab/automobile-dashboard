import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { VehicleClass } from "../../services/Vehicle";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export const ViewVehicles = () => {

    let { id } = useParams()
    const [loader, setLoader] = useState(true)
    const [vehicleData, setVehicleData] = useState({})
    useEffect(() => {
        getVehicle()
    }, [])

    async function getVehicle() {
        VehicleClass.getVehicle(id)
            .then(res => {
                console.log(res)
                setLoader(false)
                setVehicleData(res.data.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Link to='/'>

                <Button>Back</Button>
            </Link>
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
            {loader ? null :
                <Box p={15}>

                    <Typography><b>Vehicle Name :</b> {vehicleData.vehicle_name}</Typography>
                    <Typography><b>Vehicle Icon :</b> {vehicleData.vehicle_icon}</Typography>
                    <Typography><b>Vehicle Description :</b> {vehicleData.vehicle_description} </Typography>

                </Box>
            }


        </>
    )
}