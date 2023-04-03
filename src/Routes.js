import React from "react";
import { Routes, Route } from "react-router";
import { AddVehicle } from "./Components/Vehicle/AddVehicle";
import { VehicleListing } from "./Components/Vehicle/VehicleListing";
import { WrongPath } from "./WrongPath";
import { EditVehicle } from "./Components/Vehicle/EditVehicle";
import { ProductListing } from "./Components/Products/ProductListing";
import { AddProduct } from "./Components/Products/AddProduct";
import { EditProduct } from "./Components/Products/EditProduct";
import { ViewVehicles } from "./Components/Vehicle/ViewVehicle";
import { ViewProduct } from "./Components/Products/ViewProduct";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='addVehicle' element={<AddVehicle />} />
                <Route exact path='/' element={<VehicleListing />} />
                <Route exact path='/editVehicle/:id' element={<EditVehicle />} />
                <Route exact path='/viewVehicle/:id' element={<ViewVehicles />} />
                <Route exact path='/products' element={<ProductListing />} />
                <Route exact path='/addProduct' element={<AddProduct />} />
                <Route exact path='/editProduct/:id' element={<EditProduct />} />
                <Route exact path='/viewProduct/:id' element={<ViewProduct />} />
                <Route path='*' element={<WrongPath />} />
            </Routes>
        </>
    )
}