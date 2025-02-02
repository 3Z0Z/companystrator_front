import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeLayout from "./layouts/HomeLayout";
import CompaniesList from "./pages/home/CompaniesList";
import CompanyInfo from "./pages/home/CompanyInfo";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreateCompany from "./pages/home/CreateCompany";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import CreateProduct from "./pages/home/CreateProduct";
import EditProduct from "./pages/home/EditProduct";
import CreateProductCategory from "./pages/home/CreateProductCategory";
import ProtectedClientRoutes from "./utils/ProtectedClientRoutes";
import UserOrders from "./pages/home/UserOrders";

export default function Router() {
  return <BrowserRouter>
    <Routes>
      <Route element={<HomeLayout/>}>
        <Route path="/" element={<CompaniesList/>} index />
        <Route path="/company/:nit" element={<CompanyInfo/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/create-company" element={<CreateCompany/>} />
          <Route path="/company/:nit/create-product" element={<CreateProduct/>} />
          <Route path="/company/:nit/edit-product/:code" element={<EditProduct/>} />
          <Route path="/create-product-category" element={<CreateProductCategory/>} />
        </Route>
        <Route element={<ProtectedClientRoutes/>}>
          <Route path="/my-orders" element={<UserOrders/>} />
        </Route>
      </Route>
      <Route element={<AuthLayout/>} >
        <Route path="/auth/login" element={<LoginPage/>} />
        <Route path="/auth/register" element={<RegisterPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>;
}
