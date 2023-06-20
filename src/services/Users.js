import axios from "axios"
import { apis } from "../auth/api"

export const getAllUsers = async()=>{
    return await axios.get(`${apis.baseUrl}${apis.getAllUsers}`)
}
export const activeUser = async(id)=>{
    return await axios.put(`${apis.baseUrl}${apis.activeUser}${id}`)
}

export const deleteUsers = async(id)=>{
    return await axios.delete(`${apis.baseUrl}${apis.deleteUsers}${id}`)
}