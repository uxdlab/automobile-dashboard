
import React from "react"
import { apis } from "../auth/api"
import axios from "axios"

export class VehicleClass extends React.Component {
    constructor() {

    }

    static async addVehicle(data) {
        return await axios.post(`${apis.baseUrl}${apis.vehicle.add}`, data)
    }

    static async getAllVehicles() {
        return await axios.get(`${apis.baseUrl}${apis.vehicle.getAll}`)
    }

    static async getVehicle(id) {
        return await axios.get(`${apis.baseUrl}${apis.vehicle.get}/${id}`)
    }
    static async editVehicle(id, data) {
        return await axios.put(`${apis.baseUrl}${apis.vehicle.update}/${id}`, data)
    }
    static async deleteVehicle(id){
        return await axios.delete(`${apis.baseUrl}${apis.vehicle.delete}/${id}`)

    }

}
