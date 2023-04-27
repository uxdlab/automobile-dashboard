import axios from "axios";
import React from "react";
import { apis } from "../auth/api";



export class CallMultipleApi extends React.Component {
    constructor() {
    }
    static CallMultipleApi=async(data)=> {
         return await axios.all(data.map(res=>axios.get(`${apis.baseUrl}${res}`)))
    }





}