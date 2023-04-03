import React from "react";
import { apis } from "../auth/api";
import axios from "axios";



export class ProductClass extends React.Component {
    constructor() {
    }
    // Add single product 
    static async addProduct(data) {
        return await axios.post(`${apis.baseUrl}${apis.product.add}`, data)
    }
    // Get All Products 
    static async getAllProducts() {
        return await axios.get(`${apis.baseUrl}${apis.product.getAll}`)
    }
    // Get single Product by document id 
    static async getProduct(id) {
        return await axios.get(`${apis.baseUrl}${apis.product.get}/${id}`)
    }
    // Edit single Product with document id 
    static async editProduct(id, data) {
        return await axios.put(`${apis.baseUrl}${apis.product.update}/${id}`, data)
    }
    // Delete single product by document id 
    static async deleteProduct(id) {
        return await axios.delete(`${apis.baseUrl}${apis.product.delete}/${id}`)

    }



}