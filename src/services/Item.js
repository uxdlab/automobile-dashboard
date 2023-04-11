import { apis } from "../auth/api";
import axios from "axios";

//add Product
export const addItem = async (data) =>{
    return await axios.post(`${apis.baseUrl}${apis.items.add}`,data)
}

export const getAllItem = async () =>{
    return await axios.get(`${apis.baseUrl}${apis.items.getAll}`)
}

export const getItem = async (id) =>{
    return await axios.get(`${apis.baseUrl}${apis.items.get}${id}`)
}

export const deleteItem = async (id) =>{
    return await axios.delete(`${apis.baseUrl}${apis.items.delete}${id}`)
}