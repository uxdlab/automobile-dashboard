import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ModelClass } from "../../services/Model";

export const Model = ({ modelData }) => {
    const [data,setData] = useState()
    console.log(data)
    let {id} = useParams()

    useEffect(()=>{
        ModelClass.getModel(id).then((res)=>{
            setData(res.data.data)
            console.log(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <>
            <Grid container mt={2}>
                <Grid item sm={6} xs={12} className="px-3 mt-2">
                    <label>Model Name : {data!==undefined?data.model_name:''}</label><br />
                    {/* <input
                        onChange={(e) => modelData.current.model_name = e.target.value}
                        defaultValue={modelData.current.model_name} required
                        className="form-control w-100"
                    /> */}
                </Grid>
            </Grid>
        </>
    )
}