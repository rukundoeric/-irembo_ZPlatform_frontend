/* eslint-disable no-lone-blocks */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import key from 'uniqid';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import ApplyPasswordReset from './auth/ApplyPasswordReset';
import NotFound from './shared/NotFound';
// import Empty from './shared/Empty';
import Verification from './auth/VerificationComplete';
import TermsAndConditions from './settings/TermsAndConditions';
import PrivacyPolicy from './settings/PrivacyPolicy';
// import Services from './home/fragments/Services';
// import HealthTips from './home/fragments/HealthTips';
import Layout from './layouts/Layout';
import RequireAuth from './routes/RequireAuth';
import RequireAuthHome from './routes/RequireAuthHome';
import RequireAuthAdmin from './routes/RequireAuthAdmin';
import UserHome from './home/fragments/home/UserHome';

import PersistLogin from './auth/PersistLogin';
import Empty from './shared/Empty';

// Admin components
import Dashboard from './admin/Dashboard';
import AdminHome from './admin/fragments/Home';
import AdminUsers from './admin/fragments/Users';

function App() {
  return (
    <Routes>

      <Route path="/" key={key()} element={<Layout />}>

        {/* Public Routes for users */}
        <Route path="/login" key={key()} element={<Login />} />
        <Route path="/forgot-password" key={key()} element={<ForgotPassword />} />
        <Route path="/reset-password" key={key()} element={<ApplyPasswordReset />} />

        <Route path="/signup" key={key()} element={<Signup />} />
        <Route path="/verify" key={key()} element={<Verification />} />

        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" key={key()} element={<UserHome />}>
              <Route path="/profile" key={key()} element={<Empty />} />
            </Route>
          </Route>

          {/* Admin routes */}
          {/* Public routes for admin */}
          <Route path="/dashboard" key={key()} element={<Dashboard />}>
            {/* Private routes for admin */}
            {/* <Route element={<RequireAuthAdmin />}> */}
            <Route element={<RequireAuthAdmin />}>
              <Route path="/dashboard/home" key={key()} element={<AdminHome />} />
              <Route path="/dashboard/a-c-requests" key={key()} element={<AdminUsers />} />
            </Route>
          </Route>

        </Route>

        <Route path="*" key={key()} element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;
