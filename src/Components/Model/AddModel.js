
import React, { useRef, useState } from "react";
import { Model } from "./Model";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { ModelClass } from "../../services/Model";
import { Triangle } from "react-loader-spinner";

export const AddModel = () => {
    let navigate = useNavigate()

    let modelData = useRef({ model_name: '' })
    const [loader, setLoader] = useState(false)
    function formSubmit(e) {
        setLoader(true)
        e.preventDefault()
        console.log(modelData.current)
        ModelClass.addModel(modelData.current)
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
            <Typography align="center" variant="h4" mt={2}>Add Model</Typography>

            <form onSubmit={formSubmit}>
                <Model modelData={modelData} />
                <Box align='right' px={3} mt={6}>
                    <Button className="cancel_btn me-3" onClick={() => navigate('/models')}>Cancel</Button>
                    <Button type='submit' variant="contained">Save</Button>
                </Box>
            </form>
        </>
    )
}