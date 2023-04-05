import React, { useEffect, useRef, useState } from "react";
import { Model } from "./Model";
import { useNavigate, useParams } from "react-router";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { ModelClass } from "../../services/Model";

export const EditModel = () => {

    const [loader, setLoader] = useState(true)

    let modelData = useRef({})
    let { id } = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        getModel()
    }, [])
    function getModel() {
        ModelClass.getModel(id)
            .then(res => {
                console.log(res.data.data)
                modelData.current = res.data.data
                setLoader(false)
            })
            .catch(err => console.log(err))
    }

    function formSubmit(e) {
        setLoader(true)
        e.preventDefault()
        console.log(modelData.current)

        ModelClass.editModel(id, modelData.current)
            .then(res => {
                console.log(res)
                setLoader(false)
                navigate('/models')
            })
            .catch(err => console.log(err))




    }

    return (
        <>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <Box>
                    <Triangle
                        height="80"
                        width="80"
                        color="black"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={loader}
                    />
                </Box>
            </Backdrop>

            <Typography align="center" variant="h4" mt={2}>Edit Model</Typography>

            {!loader ?
                <form onSubmit={formSubmit}>

                    <Model modelData={modelData} />
                    <Box align='right' px={3} mt={6}>
                        <Button className="cancel_btn me-3" onClick={() => navigate('/models')}>Cancel</Button>
                        <Button type='submit' variant="contained">Save</Button>
                    </Box>
                </form> : null}
        </>
    )
}