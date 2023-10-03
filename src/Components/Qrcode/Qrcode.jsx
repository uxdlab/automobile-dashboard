import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Qrcode.css';
import { Dialog, Modal } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Qrcode = () => {
  const [open, setOpen] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const [denomination, setDenomination] = React.useState(''); // State variable for Denomination
  const [copies, setCopies] = React.useState(''); // State variable for Generate Copies

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleCreate = () => {
    // Handle the create button click here, and then show the table
    setShowTable(true);
    setOpen(false);
    
    // setDenomination('');
    // setCopies('');
  };
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    borderRadius:'8px',
    boxShadow: 24,
    p:4,
  };
  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 main-container">
            <Button
              className="btn_primary mt-2 mb-3"
              variant="contained"
              onClick={handleOpen}>
              ADD QR
            </Button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          maxWidth={"xs"}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="p-4" style={style}>
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="denomination">Denomination</label>
                <input
                  type="number"
                  size={40}
                  className="form-control"
                  value={denomination}
                  onChange={(e) => setDenomination(e.target.value)} // Update Denomination state
                />
                <br />
                <label className="pt-4">Generate Copies</label>
                <input
                  type="number"
                  className="form-control"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)} // Update Generate Copies state
                />

                <div className="create mt-4 h justify-content-end">
                  <Button className="btn_primary mt-3" variant="contained" onClick={handleCreate} >
                    Print
                  </Button>
                  <Button className="btn cancel_btn ms-4 mt-3" variant="" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>


        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className='text-center'>
                  <TableCell><b>Denomination</b></TableCell>
                  <TableCell><b>Generated Copies</b></TableCell>
                  <TableCell><b>Created Date</b></TableCell>
                </TableRow>
              </TableHead>
          </Table>
          </TableContainer>
        
          

        {showTable && (
          <TableContainer component={Paper}>
            <Table>
              {/* <TableHead>
                <TableRow className='text-center'>
                  <TableCell><b>Denomination</b></TableCell>
                  <TableCell><b>Generated Copies</b></TableCell>
                  <TableCell><b>Created Date</b></TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                <TableRow className='text-center'>
                  <TableCell>{denomination}</TableCell>
                  <TableCell className='text-center'>{copies}</TableCell>
                  <TableCell className='text-center'>01/8/2023</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};
