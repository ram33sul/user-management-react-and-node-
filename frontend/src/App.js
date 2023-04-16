import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import './App.css';
import HomePage from './pages/home_page';
import ProfilePage from './pages/profile_page';
import AdminLoginPage from './pages/admin_login_page';
import AdminHomePage from './pages/admin_home_page';
import AdminEditUserPage from './pages/admin_edit_user_page';
import AdminAddNewUserPage from './pages/admin_add_newUser_page';
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/admin' element={<AdminLoginPage />} />
        <Route path='/admin/home' element={<AdminHomePage />} />
        <Route path='/admin/editUser' element={<AdminEditUserPage />} />
        <Route path='/admin/addNewUser' element={<AdminAddNewUserPage />} />
      </Routes>
    </>
  );
}

export default App;
