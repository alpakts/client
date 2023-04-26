import "./App.css";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./app/routes/login.route";
import RegisterComponent from "./app/components/login/register.components";
import LoginComponent from "./app/components/login/login.component";
import AdminRoute from "./app/routes/admin.route";
import CompanyRoute from "./app/routes/company.route";
import CompanyList from "./app/components/company/company-list.component";
import NotFound from "./app/routes/notfound";
import EditCompany from "./app/components/company/edit.company";
import AddCompany from "./app/components/company/add-company.component";
import ProductRoute from "./app/routes/product.route";
import ProductList from "./app/components/product/product-list.component";
import AddProduct from "./app/components/product/add-product.component";
import Editproducts from "./app/components/product/edit.product";
import Dashboard from "./app/routes/dashboard.route";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const[isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem("token"));
  var user=useSelector(state=>state.user);
  useEffect(()=>{
    setIsAuthenticated(localStorage.getItem("token"))
  },[])
  // user.token; // Örnek olarak false olarak ayarlandı, gerçek uygulamada gerekli doğrulama yapılmalıdır
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<LoginComponent  />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
          </Route>
        
          <Route   path="admin" element={isAuthenticated? <AdminRoute/>:<Navigate to="/" />}>
            <Route index element={<Dashboard/>}></Route>
            <Route path="products" element={<ProductRoute/>}>
            <Route index element={<ProductList/>}></Route>
            <Route path="add" element={<AddProduct/>}></Route>
            <Route path="edit/:id" element={<Editproducts/>}></Route>
            </Route>
            <Route path="companies" element={<CompanyRoute/>}>
              <Route index element={<CompanyList/>}></Route>
              <Route path="edit/:id" element={<EditCompany/>}></Route>
              <Route path="add" element={<AddCompany/>}></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
