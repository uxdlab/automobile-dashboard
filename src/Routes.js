import React from "react";
import { Routes, Route } from "react-router";
import { SegmentListing } from "./Components/Segment/SegmentListing";
import { WrongPath } from "./WrongPath";
import { Category} from "./Components/Category/Category";
import { ModelListing } from "./Components/Model/ModelListing";
import { BrandListing } from "./Components/Brand/BrandListing";
import { LoginPage } from "./Components/Login/LoginPage";
import { CheckAuth } from "./auth/CheckAuth";
import { LoginKeeper } from "./auth/LoginKeeper";

import UsersListing from "./Components/Users/UsersListing";
import PaymentListing from "./Components/Payment/PaymentListing";
import ProductListing from "./Components/Product/ProductListing";
import AddProduct from "./Components/Product/AddProduct";
import UpdateProduct from "./Components/Product/UpdateProduct";
import { ManufactureListing } from "./Components/Manufacture/ManufactureListing";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route element={<LoginKeeper />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<CheckAuth />} >

                    {/* Segment Routes */}
                    <Route exact path='/' element={<SegmentListing />} />

                    {/* Category Routes  */}
                    <Route exact path='/category' element={<Category />} />

                    {/* Brand Routes */}
                    <Route exact path='/brand' element={<BrandListing />} />

                    {/* Model Routes */}
                    <Route exact path='/models' element={<ModelListing />} />

                    {/* Users Routes */}
                    <Route exact path='/users' element={<UsersListing />} />

                    {/* Orders Routes  */}
                    <Route exact path='/orders' element={<PaymentListing />} />

                    {/* Manufecture Routes  */}
                    <Route exact path='/manufacture' element={<ManufactureListing />} />

                    {/* product Routes */}
                    <Route exact path='/product' element={<ProductListing />} />
                    <Route exact path='/addProduct' element={<AddProduct />} />
                    <Route exact path='/updateProduct/:id' element={<UpdateProduct />} />
                    
                    <Route path='*' element={<WrongPath />} />
                </Route>
            </Routes>
        </>
    )
}