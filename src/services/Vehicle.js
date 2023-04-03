
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



}
