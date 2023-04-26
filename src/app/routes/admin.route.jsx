import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/layout/header.component";
import Tablee from "../components/table/table.component";
import PieChart from "../components/dashboard/company-chart.component";

export default function AdminRoute(){
    return (
        <>
        
        <HeaderComponent></HeaderComponent>
        <Outlet/>
        </>
    )
}