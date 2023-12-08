import React from "react";
import { Routes, Route } from "react-router";
import { SegmentListing } from "./Components/Segment/SegmentListing";
import { WrongPath } from "./WrongPath";
import { Category } from "./Components/Category/Category";
import { ModelListing } from "./Components/Model/ModelListing";
import { BrandListing } from "./Components/Brand/BrandListing";
import { LoginPage } from "./Components/Login/LoginPage";
import { CheckAuth } from "./auth/CheckAuth";
import { LoginKeeper } from "./auth/LoginKeeper";

import UsersListing from "./Components/Users/UsersListing";
import PaymentListing from "./Components/Payment/PaymentListing";
import ProductListing from "./Components/Product/ProductListing";

import OrderHistory from "./Components/OrderHistory/OrderHistory";

import ViewOrderHistory from "./Components/OrderHistory/ViewOrderHistory";

import AddProduct from "./Components/Product/AddProduct";
import UpdateProduct from "./Components/Product/UpdateProduct";
import { ManufactureListing } from "./Components/Manufacture/ManufactureListing";
import Abouts from "./Components/Container/Abouts";
import PrivacyPolicy from "./Components/Container/PrivacyPolicy";
import TermAndCondition from "./Components/Container/TermAndCondition";
import Onboarding from "./Components/Container/Onboarding";
import PromoListing from "./Components/Promo/PromoListing";
import MechanicListing from "./Components/Mechanic/MechanicListing";
import { Qrcode } from "./Components/Qrcode/Qrcode";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<LoginKeeper />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<CheckAuth />}>
          <Route exact path="/segment" element={<SegmentListing />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/brand" element={<BrandListing />} />
          <Route exact path="/models" element={<ModelListing />} />
          <Route exact path="/" element={<UsersListing />} />
          <Route exact path="/orders" element={<PaymentListing />} />
          <Route exact path="/orderHistory" element={<OrderHistory />} />
          <Route
            exact
            path="orderHistory/viewOrderHistory/:Id"
            element={<ViewOrderHistory />}
          />

          <Route exact path="/manufacture" element={<ManufactureListing />} />
          {/* product Routes */}
          <Route exact path="/product" element={<ProductListing />} />
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route exact path="/about-us" element={<Abouts />} />
          <Route exact path="privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="term-condition" element={<TermAndCondition />} />
          <Route exact path="on-boarding" element={<Onboarding />} />
          <Route exact path="promo-listing" element={<PromoListing />} />
          <Route exact path="mechanic-listing" element={<MechanicListing />} />
          <Route exact path="qrcode" element={<Qrcode />} />

          <Route path="*" element={<WrongPath />} />
        </Route>
      </Routes>
    </>
  );
};
