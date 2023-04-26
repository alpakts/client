import axios from "axios"
const BASE_URL="http://localhost:4000";
var token=window.localStorage.getItem("token");
var config={ headers: {"Authorization" : token}}
export const Get=async (url)=>{
    token=window.localStorage.getItem("token");
    config={ headers: {"Authorization" : token}}
    return await axios.get(BASE_URL+url,config)
}
export const Post=async (url,data)=>{
    token=window.localStorage.getItem("token");
    config={ headers: {"Authorization" : token}}
    return await axios.post(BASE_URL+url,data,config)
}
export const Put=async (url,data)=>{
    token=window.localStorage.getItem("token");
    config={ headers: {"Authorization" : token}}
    return await axios.put(BASE_URL+url,data,config)
}
export const Delete=async (url)=>{
    token=window.localStorage.getItem("token");
    config={ headers: {"Authorization" : token}}
    return await axios.delete(BASE_URL+url,config)
}
