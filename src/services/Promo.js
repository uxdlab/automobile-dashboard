import axios from "axios";
import { apis } from "../auth/api";


export const add = async(data) =>{
    return await axios.post(`${apis.baseUrl}${apis.promo.add}`,data);
}

export const getAllPromo = async() =>{
    return await axios.get(`${apis.baseUrl}${apis.promo.getAllPromo}`)
}
export const getPromoId = async(id) =>{
    return await axios.get(`${apis.baseUrl}${apis.promo.getPromoId}${id}`)
}
export const updatePromo = async(id,data) =>{
    return await axios.put(`${apis.baseUrl}${apis.promo.updatePromo}${id}`,data)
}