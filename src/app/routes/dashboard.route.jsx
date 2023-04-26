import { useEffect, useState } from "react";
import  { PieChart } from "../components/dashboard/company-chart.component";
import CompanyInfo from "../components/dashboard/company.info";
import { Get } from "../utils/axios.service";

export default function Dashboard(){
    const [companies,setCompanies]=useState([]);
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        Get("/api/products").then(s=>setProducts(s.data));
        Get("/api/company").then(s=>setCompanies(s.data.slice(0,3)));
    },[])
    const data = [
        {
            name: "John",
            website: "https://www.example.com/john",
            country: "USA",
            companyLegalNumber: "12345"
        },
        {
            name: "Alice",
            website: "https://www.example.com/alice",
            country: "UK",
            companyLegalNumber: "67890"
        },
        // Diğer kişiler buraya eklenebilir
    ];
    return (
        <>
        <div className="container mx-auto">
         <div className="container h-2/1 w-2/1">
            <PieChart data={data} />
            </div>
            <div className="flex ">
            <CompanyInfo type={0} columss={["Name","Legal number","Country","Website"]} data={companies} head={"Lastly Added Companies"}></CompanyInfo><CompanyInfo columss={["Name","Category","Amount","Amount Unit","Company"]} type={1} data={products.slice(0,3)} head={"Lastly Added Products"}></CompanyInfo>

            </div>
           </div>
        </>
    )
}