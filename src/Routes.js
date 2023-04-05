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
import { ModelListing } from "./Components/Model/ModelListing";
import { AddModel } from "./Components/Model/AddModel";
import { CompanyListing } from "./Components/Company/CompanyListing";
import { AddCompany } from "./Components/Company/AddCompany";
import { EditCompany } from "./Components/Company/EditCompany";
import { EditModel } from "./Components/Model/EditModel";
import { LoginPage } from "./Components/Login/LoginPage";
import { CheckAuth } from "./auth/CheckAuth";
import { LoginKeeper } from "./auth/LoginKeeper";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Model } from "./Components/Model/Model";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route element={<LoginKeeper />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<CheckAuth />} >
                    <Route exact path='/' element={<VehicleListing />} />
                    <Route path='addVehicle' element={<AddVehicle />} />
                    <Route exact path='/editVehicle/:id' element={<EditVehicle />} />
                    <Route exact path='/viewVehicle/:id' element={<ViewVehicles />} />
                    <Route exact path='/products' element={<ProductListing />} />
                    <Route exact path='/addProduct' element={<AddProduct />} />
                    <Route exact path='/editProduct/:id' element={<EditProduct />} />
                    <Route exact path='/viewProduct/:id' element={<ViewProduct />} />
                    <Route exact path='/company' element={<CompanyListing />} />
                    <Route exact path='/addCompany' element={<AddCompany />} />
                    <Route exact path='/editCompany/:id' element={<EditCompany />} />
                    <Route exact path='/editModel/:id' element={<EditModel />} />
                    <Route exact path='/model/:id' element={<Model />} />
                    <Route exact path='/models' element={<ModelListing />} />
                    <Route exact path='/addModel' element={<AddModel />} />
                    <Route path='*' element={<WrongPath />} />
                </Route>
            </Routes>
        </>
    )
}