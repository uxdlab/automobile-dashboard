
import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { Backdrop, Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import "rc-pagination/assets/index.css";
import { ModelClass } from "../../services/Model";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Triangle } from "react-loader-spinner";

export const ModelListing = () => {

    const [loader, setLoader] = useState(true)

    const [allData, setData] = useState([])
    const [countPerPage, setCountPerPage] = useState(5);
    const [value, setValue] = React.useState("");
    const [deleteModel, setDeleteModel] = useState(false)
    const [currentPage, setCurrentPage] = React.useState(1);
    const [deleteMod, setDeletedMod] = useState({ id: '', index: '' })


    const [collection, setCollection] = React.useState(
        (allData.slice(0, countPerPage))
    );
    let navigate = useNavigate()
    useEffect(() => {
        getAllModels()
    }, [])
    function getAllModels() {
        setLoader(true)
        ModelClass.getAllModel()
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data)
                setLoader(false)
            })
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        }
    }, [value, countPerPage, allData]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(allData.slice(from, to));
    };
    function deleteModelf() {
        console.log(deleteMod)
        setDeleteModel(false)
        setLoader(true)

        ModelClass.deleteModel(deleteMod.id)
            .then(res => {
                console.log(res)
                getAllModels()
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className="mt-2 fs-2 text-center">Models</div>
            <Box align='right' className='p-3'>
                <Link style={{ textDecoration: 'none' }} to='/addModel'>
                    <Button className="btn_primary" variant="contained">Add Model</Button>
                </Link>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <Dialog
                    open={deleteModel}
                    maxWidth={'sm'}
                    fullWidth={true}
                >
                    <Box p={3}>
                        <Box>Are you sure you want to delete?</Box>
                        <Box align='right'>
                            <Button className='cancel_btn me-3' onClick={() => setDeleteModel(false)}>Cancel</Button>
                            <Button variant="contained" onClick={deleteModelf}>Delete</Button>
                        </Box>
                    </Box>

                </Dialog>
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
            {!loader ?
                <Box sx={{ mx: 2 }} className='border'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collection.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{res.model_name}</TableCell>
                                        <TableCell>
                                            <RemoveRedEye onClick={()=>navigate(`/model/${res._id}`)}/>
                                            <Edit onClick={() => navigate(`/editModel/${res._id}`)} />
                                            <Delete
                                                onClick={() => {
                                                    setDeletedMod({ id: res._id, index })
                                                    setDeleteModel(true)
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Box sx={{ m: 1 }} className='d-flex justify-content-end'>
                        <select className="me-2" onChange={(e) => setCountPerPage(e.target.value * 1)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                        <Pagination
                            pageSize={countPerPage}
                            onChange={updatePage}
                            current={currentPage}
                            total={allData.length}
                            style={{ color: 'green' }}
                        />
                    </Box>
                </Box>
                : null}

        </>
    );
}
