import axios from "axios";
import { apis } from "../auth/api";


export const getAllManufacturers = async () => {
    return await axios.get(`${apis.baseUrl}${apis.manufacture.getAll}`)
}

export const getManufacturerById = async (id) => {
    return await axios.get(`${apis.baseUrl}${apis.manufacture.get}${id}`)
}

export const addManufacturers = async (data) => {
    return await axios.post(`${apis.baseUrl}${apis.manufacture.add}`,data)
}

export const editManufacturers = async (id,data) => {
    return await axios.put(`${apis.baseUrl}${apis.manufacture.edit}${id}`,data)
}