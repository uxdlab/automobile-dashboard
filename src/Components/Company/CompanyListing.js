
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const CompanyListing = () => {
    return (
        <>
            <div className="mt-2 fs-2 text-center">Companies</div>

            <Box align='right' className='p-3'>
                <Link style={{ textDecoration: 'none' }} to='/addCompany'>
                    <Button className="btn_primary" variant="contained">Add Company</Button>
                </Link>
            </Box>
            <div className="p-3">
                <Table className="border">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sno.</TableCell>
                            <TableCell>Company Name</TableCell>
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
