
import React from "react"
import { apis } from "../auth/api"
import axios from "axios"

export class VehicleClass extends React.Component {
    constructor() {

    }
    // Add single Vehicle 
    static async addVehicle(data) {
        return await axios.post(`${apis.baseUrl}${apis.vehicle.add}`, data)
    }
    // Get all Vehicles 
    static async getAllVehicles() {
        return await axios.get(`${apis.baseUrl}${apis.vehicle.getAll}`)
    }
    // Get single Vehicle by document id 
    static async getVehicle(id) {
        return await axios.get(`${apis.baseUrl}${apis.vehicle.get}/${id}`)
    }
    // Edit single Vehicle by document id 
    static async editVehicle(id, data) {
        return await axios.put(`${apis.baseUrl}${apis.vehicle.update}/${id}`, data)
    }
    // Delete single Vehicle by document id 
    static async deleteVehicle(id) {
        return await axios.delete(`${apis.baseUrl}${apis.vehicle.delete}/${id}`)

    }
    static async getSegmentBrandModel() {
        return await axios.get(`${apis.baseUrl}${apis.getAllData}`)

    }

}
