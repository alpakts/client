import { Outlet } from "react-router-dom";

export default function Login(){
    return (
    <>
        <div className="overflow-x-hidden">
        <Outlet></Outlet>
        </div>
      
    </>)
}