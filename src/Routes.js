import React from "react";
import { Routes, Route } from "react-router";
import { AddSegment, AddVehicle } from "./Components/Segment/AddSegment";
import { SegmentListing } from "./Components/Segment/SegmentListing";
import { WrongPath } from "./WrongPath";
import { EditSegment, EditVehicle } from "./Components/Segment/EditSegment";
import { Category} from "./Components/Category/Category";
import { AddProduct } from "./Components/Category/AddCategory";
import { EditProduct } from "./Components/Category/EditCategory";
import { ViewVehicles } from "./Components/Segment/ViewVehicle";
import { ViewProduct } from "./Components/Category/ViewCategory";
import { ModelListing } from "./Components/Model/ModelListing";
import { AddModel } from "./Components/Model/AddModel";
import { CompanyListing } from "./Components/Company/CompanyListing";
import { AddCompany } from "./Components/Company/AddCompany";
import { EditCompany } from "./Components/Company/EditCompany";
import { EditModel } from "./Components/Model/EditModel";
import { LoginPage } from "./Components/Login/LoginPage";
import { CheckAuth } from "./auth/CheckAuth";
import { LoginKeeper } from "./auth/LoginKeeper";
import { Model } from "./Components/Model/Model";
import UsersListing from "./Components/Users/UsersListing";
import PaymentListing from "./Components/Payment/PaymentListing";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route element={<LoginKeeper />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<CheckAuth />} >
                    <Route exact path='/' element={<SegmentListing />} />
                    <Route path='addSegment' element={<AddSegment />} />
                    <Route exact path='/editSegment/:id' element={<EditSegment />} />
                    <Route exact path='/viewVehicle/:id' element={<ViewVehicles />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/addProduct' element={<AddProduct />} />
                    <Route exact path='/editProduct/:id' element={<EditProduct />} />
                    <Route exact path='/viewProduct/:id' element={<ViewProduct />} />
                    <Route exact path='/brand' element={<CompanyListing />} />
                    <Route exact path='/addCompany' element={<AddCompany />} />
                    <Route exact path='/editCompany/:id' element={<EditCompany />} />
                    <Route exact path='/editModel/:id' element={<EditModel />} />
                    <Route exact path='/model/:id' element={<Model />} />
                    <Route exact path='/models' element={<ModelListing />} />
                    <Route exact path='/addModel' element={<AddModel />} />
                    <Route exact path='/users' element={<UsersListing />} />
                    <Route exact path='/payment' element={<PaymentListing />} />
                    <Route path='*' element={<WrongPath />} />
                </Route>
            </Routes>
        </>
    )
}