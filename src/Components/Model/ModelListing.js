
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ModelListing = () => {
    return (
        <>
            <Box align='right' className='p-3'>
                <Link style={{ textDecoration: 'none' }} to='/addModel'>
                    <Button className="btn_primary" variant="contained">Add Model</Button>
                </Link>
            </Box>
            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sno.</TableCell>
                            <TableCell>Model Name</TableCell>
                            <TableCell>Desc</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>rr</TableCell>
                            <TableCell>rr</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

        </>
    )
}
