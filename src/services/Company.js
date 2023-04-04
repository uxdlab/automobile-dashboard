import React from "react";
import { apis } from "../auth/api";
import axios from "axios";



export class CompanyClass extends React.Component {
    constructor() {
    }
    // Add single company 
    static async addCompany(data) {
        return await axios.post(`${apis.baseUrl}${apis.company.add}`, data)
    }
    // Get All companys 
    static async getAllCompany() {
        return await axios.get(`${apis.baseUrl}${apis.company.getAll}`)
    }
    // Get single company by document id 
    static async getCompany(id) {
        return await axios.get(`${apis.baseUrl}${apis.company.get}/${id}`)
    }
    // Edit single company with document id 
    static async editCompany(id, data) {
        return await axios.put(`${apis.baseUrl}${apis.company.update}/${id}`, data)
    }
    // Delete single company by document id 
    static async deleteCompany(id) {
        return await axios.delete(`${apis.baseUrl}${apis.company.delete}/${id}`)

    }



}