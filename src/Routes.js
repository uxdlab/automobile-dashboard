import React from "react";
import { Routes, Route } from "react-router";
import { AddVehicle } from "./Components/Vehicle/AddVehicle";
import { VehicleListing } from "./Components/Vehicle/VehicleListing";
import { WrongPath } from "./WrongPath";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='addVehicle' element={<AddVehicle />} />
                <Route exact path='/' element={<VehicleListing />} />
                <Route path='*' element={<WrongPath />} />
            </Routes>
        </>
    )
}