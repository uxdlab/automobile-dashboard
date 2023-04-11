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

export const editItem = async (id,data) =>{
    console.log(id)
    console.log(data)
    return await axios.put(`${apis.baseUrl}${apis.items.edit}${id}`,data)
}