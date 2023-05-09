import React, { useEffect, useState } from 'react'
import  './Style.css'
import { Box, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Pagination from 'rc-pagination';
import { getAllUsers } from '../../services/Users';
import { Delete, Edit } from '@mui/icons-material';


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

    const getUsers = ()=>{
        getAllUsers()
        .then(res=>setAllUsers(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getUsers()
    },[])

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
                                <TableCell className="w-25"><b>Name</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Phone No.</b></TableCell>
                                <TableCell><b>Active</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collection.map((res, index) => {
                                return (
                                    <TableRow key={index}>
                                        {/* <TableCell>{index + 1}</TableCell> */}
                                        <TableCell className='text_cap'>{res.fullName}</TableCell>
                                        <TableCell >{res.email}</TableCell>
                                        <TableCell >{res.mobile_number}</TableCell>
                                        <TableCell ><Switch defaultChecked /></TableCell>
                                        <TableCell>
                                            {/* <RemoveRedEye  /> */}
                                            <Delete
                                                className="pointer"
                                               
                                            />&nbsp;&nbsp;
                                            <Edit className="pointer" />
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
