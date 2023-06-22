import axios from "axios";
import { apis } from "../auth/api";

export const addabout = async (data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addabout}`, data);
}
export const getAbout = async ()=>{
    return await axios.get(`${apis.baseUrl}${apis.contain.getAbout}`)
}
export const updataAbout = async(id,data)=>{
    return await axios.put(`${apis.baseUrl}${apis.contain.updataAbout}${id}`,data);
}
export const addPrivacy = async (data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addPrivacy}`,data)
}
export const getPrivacy = async ()=> {
    return await axios.get(`${apis.baseUrl}${apis.contain.getPrivacy}`)
}
export const updatePrivacy = async (id,data)=>{
    return await axios.put(`${apis.baseUrl}${apis.contain.updatePrivacy}${id}`,data)
}
export const addTerm = async(data)=>{
    return await axios.post(`${apis.baseUrl}${apis.contain.addTerm}`,data)
}
export const getTermsCondition = async()=>{
    return await axios.get(`${apis.baseUrl}${apis.contain.getTermsCondition}`)
}
export const updateTerms = async (id,data)=>{
    return await axios.put(`${apis.baseUrl}${apis.contain.updateTerms}${id}`,data)
}