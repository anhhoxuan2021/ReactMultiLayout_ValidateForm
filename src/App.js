import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";

import UserLogin from './pages/users/Login';
import Register from './pages/users/Register';

import Product from './pages/admin/Product';

import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';
import LoginLayout from './layouts/LoginLayout';

import "./fontawasome"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home  />} />
        </Route>
        <Route path="/" element={<LoginLayout />} >
          <Route path="/login" element={<UserLogin />} />
          <Route path='/register' element = {<Register />} />
        </Route>
        <Route path="/" element={<AdminLayout />} >
          <Route path="/admin/product/:id" element={<Product  />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
