import  { React,useEffect,useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Get } from '../../utils/axios.service';

ChartJS.register(ArcElement, Tooltip, Legend);

 const data = {
  labels: ['Companies', 'Products',],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
       
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  const [companies,setCompanies]=useState([]);
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    Get("/api/products").then(res=>{
      setProducts(res.data)});
    Get("/api/company").then((res)=>setCompanies(res.data))
  },[])
  const data = {
    labels: ['Companies', 'Products',],
    datasets: [
      {
        
        label: 'registered in system ',
        data: [companies.length,products.length],
        backgroundColor: [
          'rgba(0,255,0,0.3)',
          'rgba(80, 200, 235, 0.4)',
        
        ],
        borderColor: [
          'rgba(0,255,0,1)',
          'rgba(54, 162, 235, 1)',
         
        ],
        borderWidth: 1,
      },
    ],
  };
  return (<div className='mx-auto' style={{width:"500px",height:"500px"}}><Pie  data={data} /></div>);
}
