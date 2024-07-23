import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./ContactUs";
import Donate from "./Donate";
import Notices from "./Notices";
import Home from "./Home";
import Signup from "./Signup";
import LendingPayment from "./LendingPaymentPage/LendingPayment";
import SingleLend from "../components/lend/SingleLend";
import Login from "./Login";
import SingleDonate from "../components/donate/SingleDonate";
import SuccessPayment from "./SuccessPayment";
import Review from "./Review";
import GoogleAuth from "./GoogleAuth";
// import Application from "./Application";
import Admindonate from './AdminDonate'
import AdminApplication from './AdminApplications'
import Support from "./Support";
import Guidelines from "./Guidelines"
import ApplicationForm from './ApplicationForm'
import SingleAdminApplication from './SingleAdminApplication';
import SingleAdminDonate from "./SingleAdminDonate";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/donate/:id" element={<SingleDonate />} />
      <Route path="/support" element={<Support />} />
      <Route path="/apply" element={<ApplicationForm />} />
      <Route path="/lend/:id" element={<SingleLend />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/review" element={<Review />} />
      <Route path="/guidelines" element={<Guidelines />} />
      <Route path="/google" element={<GoogleAuth />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/admindonate" element={<Admindonate />} />
      <Route path="/admindonate/:id" element={<SingleAdminDonate />} />
      <Route path="/adminapplications" element={<AdminApplication />} />
      <Route path="/adminapplications/:id" element={<SingleAdminApplication />} />
      <Route path="/lendingPayment" element={<LendingPayment />} />
      <Route path="/successPayment" element={<SuccessPayment />} />
    </Routes>
  );
};

export default MainRoutes;
