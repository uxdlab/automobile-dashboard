import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { VehicleClass } from "../../services/Vehicle";
import { Segment } from "./Segment";
import { Triangle } from "react-loader-spinner";
import { ProductClass } from "../../services/Product";

export const AddSegment = () => {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const [allProducts, setAllProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])

    const allVehicles = useRef([
        {
            vehicle_name: '',
            vehicle_description: '',
            vehicle_icon: '',
        }
    ])


    useEffect(() => {
        getAllProducts()
    }, [])

    function getAllProducts() {

        ProductClass.getAllProducts()
            .then((res) => {
                console.log(res.data.data)
                setAllProducts(res.data.data)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }



    const submitForm = async (e) => {
        e.preventDefault()
        setLoader(true)
        console.log(allVehicles)
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

            <Typography variant="h4" mx={2} mt={2}>Add Segment</Typography>

            <form onSubmit={submitForm}>
                {allVehicles.current.map((veh, index) => {
                    return (
                        <Segment
                            key={index}
                            allVehicles={allVehicles}
                            vehicleData={veh}
                            index={index}
                            allProducts={allProducts}
                            previousProduct={{ state: selectedProduct, setState: setSelectedProduct }}
                        />
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