import axios from "axios";
import { apis } from "../auth/api";

export const addabout = async (data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addabout}`, data);
}
export const updataAbout = async(id,data)=>{
    return await axios.put(`${apis.baseUrl}${apis.contain.updataAbout}${id}`,data);
}
export const addPrivacy = async (data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addPrivacy}`,data)
}
export const addTerm = async(data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addTerm}`,data)
}