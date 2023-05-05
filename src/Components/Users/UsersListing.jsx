import React, { useState } from 'react'
import  './Style.css'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from 'rc-pagination';


export default function UsersListing() {
    const [allUsers,setAllUsers] = useState([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [countPerPage, setCountPerPage] = useState(5);
    const [value, setValue] = React.useState("");
    const [collection, setCollection] = React.useState(
        (allUsers.slice(0, countPerPage))
    );

    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        }
    }, [value, countPerPage, allUsers]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(allUsers.slice(from, to));
    };
  return (
    <>
    <div class="container-fluid">
            <div class="col mt-2 d-flex justify-content-between">
                <h1 class="d-inline-block">Customers</h1>
            </div>
    </div>
    <Box sx={{ mx: 2 }} className='border'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell className="w-12"><b>S.No</b></TableCell> */}
                                <TableCell className="w-25"><b>Model Icon</b></TableCell>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collection.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        {/* <TableCell>{index + 1}</TableCell> */}
                                        <TableCell><img className='w-12' src={res.model_icon?res.model_icon:'images/noImage.png'}/></TableCell>
                                        <TableCell sx={{textTransform:'capitalize'}}>{res.model_name}</TableCell>
                                        <TableCell>
                                            {/* <RemoveRedEye onClick={() => navigate(`/model/${res._id}`)} /> */}
                                            {/* <Delete
                                                className="pointer"
                                                onClick={() => {
                                                    setDeletedMod({ id: res._id, index, icon: res.model_icon })
                                                    setDeleteModel(true)
                                                }}
                                            />&nbsp;&nbsp;
                                            <Edit className="pointer" onClick={() => getModelById(res._id, res.model_icon)} /> */}
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
                            total={allUsers.length}
                            style={{ color: 'green' }}
                        />
                    </Box>
                </Box>
    </>
  )
}
