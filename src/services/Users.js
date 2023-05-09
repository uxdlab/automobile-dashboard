import axios from "axios"
import { apis } from "../auth/api"

export const getAllUsers = async()=>{
    return await axios.get(`${apis.baseUrl}${apis.getAllUsers}`)
}