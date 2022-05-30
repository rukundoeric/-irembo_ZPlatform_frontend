import React from 'react';
import { Route, Routes } from 'react-router-dom';
import key from 'uniqid';
import Login from './auth/Login';
import SecondFactorAuth from './auth/SecondFactorAuth';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import ApplyPasswordReset from './auth/ApplyPasswordReset';
import NotFound from './shared/NotFound';
import Verification from './auth/VerificationComplete';
import Layout from './layouts/Layout';
import RequireAuth from './routes/RequireAuth';

import Profile, { ProfileInfo } from './pages/fragments/Profile';
import ProfileSetting from './pages/fragments/ProfileSettings';
import EditProfile from './pages/fragments/EditProfile';
import ProfileVerifyAccount from './pages/fragments/ProfileVerifyAccount';
import Home from './pages/Home';
import FragmentHome from './pages/fragments/Home';

import PersistLogin from './auth/PersistLogin';

import VerificationsRequest from './admin/fragments/VerificationsRequest';

function App() {
  return (
    <Routes>

      <Route path="/" key={key()} element={<Layout />}>

        {/* Public Routes for users */}
        <Route path="/login" key={key()} element={<Login />} />
        <Route path="/login/second-factor-auth" key={key()} element={<SecondFactorAuth />} />
        <Route path="/forgot-password" key={key()} element={<ForgotPassword />} />
        <Route path="/reset-password" key={key()} element={<ApplyPasswordReset />} />

        <Route path="/signup" key={key()} element={<Signup />} />
        <Route path="/verify" key={key()} element={<Verification />} />

        {/* Private Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth roles={[1, 0]} />}>
            <Route path="/" key={key()} element={<Home />}>
              <Route path="/" key={key()} element={<FragmentHome />} />
              <Route path="/profile" key={key()} element={<Profile />}>
                <Route path="/profile" key={key()} element={<ProfileInfo />} />
                <Route path="/profile/edit" key={key()} element={<EditProfile />} />
                <Route path="/profile/verify" key={key()} element={<ProfileVerifyAccount />} />
                <Route path="/profile/settings" key={key()} element={<ProfileSetting />} />
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth roles={[1, 1]} />}>
            <Route path="/" key={key()} element={<Home />}>
              <Route path="/verification-requests" key={key()} element={<VerificationsRequest />} />
            </Route>
          </Route>

        </Route>

        <Route path="*" key={key()} element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;
