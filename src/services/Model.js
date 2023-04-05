import React from "react";
import { apis } from "../auth/api";
import axios from "axios";

export class ModelClass extends React.Component {
    constructor() {
    }
    // Add single model 
    static async addModel(data) {
        return await axios.post(`${apis.baseUrl}${apis.model.add}`, data)
    }
    // Get All model 
    static async getAllModel() {
        return await axios.get(`${apis.baseUrl}${apis.model.getAll}`)
    }
    // Get single model by document id 
    static async getModel(id) {
        return await axios.get(`${apis.baseUrl}${apis.model.get}/${id}`)
    }
    // Edit single model with document id 
    static async editModel(id, data) {
        return await axios.put(`${apis.baseUrl}${apis.model.update}/${id}`, data)
    }
    // Delete single model by document id 
    static async deleteModel(id) {
        return await axios.delete(`${apis.baseUrl}${apis.model.delete}/${id}`)
    }
}