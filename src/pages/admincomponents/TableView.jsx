import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  IconButton,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { format, isValid, parseISO } from 'date-fns';

const TableView = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    contactNo: '',
    stage: '',
    dateFrom: '',
    dateTo: '',
  });

  const tableData = columns.flatMap(column =>
    column.contacts.map(contact => ({
      ...contact,
      stage: column.name,
    }))
  );

  const filteredData = tableData.filter(contact => {
    const contactDate = parseISO(contact.dateCreated);
    const dateFrom = filters.dateFrom ? parseISO(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? parseISO(filters.dateTo) : null;
    return (
      contact.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      contact.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      contact.contactNo.includes(filters.contactNo) &&
      (filters.stage === '' || contact.stage === filters.stage) &&
      (!dateFrom || contactDate >= dateFrom) &&
      (!dateTo || contactDate <= dateTo)
    );
  });

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
    setCurrentPage(1);
  };

  const handleDownload = () => {
    const csvContent = [
      ['Name', 'Contact No', 'Email', 'Date Created', 'Stage'],
      ...filteredData.map(contact => [
        contact.name,
        contact.contactNo,
        contact.email,
        contact.dateCreated,
        contact.stage,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'contacts.csv');
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <Paper className="p-6">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            size="small"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            size="small"
            value={filters.email}
            onChange={handleFilterChange}
          />
          <TextField
            label="Mobile No"
            name="contactNo"
            variant="outlined"
            size="small"
            value={filters.contactNo}
            onChange={handleFilterChange}
          />
          <Select
            value={filters.stage}
            name="stage"
            onChange={handleFilterChange}
            displayEmpty
            size="small"
          >
            <MenuItem value="">All Stages</MenuItem>
            {columns.map(column => (
              <MenuItem key={column.name} value={column.name}>{column.name}</MenuItem>
            ))}
          </Select>
          <TextField
            label="From Date"
            name="dateFrom"
            variant="outlined"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
          <TextField
            label="To Date"
            name="dateTo"
            variant="outlined"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? paginatedData.map((contact, index) => (
              <TableRow key={index} hover>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.contactNo}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  {isValid(parseISO(contact.dateCreated)) ? format(parseISO(contact.dateCreated), 'dd-MM-yyyy') : 'Invalid date'}
                </TableCell>
                <TableCell>{contact.stage}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No contacts</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-6 flex justify-end items-center gap-4">
        <Typography variant="body2">
          Items per page:
        </Typography>
        <FormControl variant="outlined" size="small">
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            style={{ border: 'none', padding: '0', outline: 'none', boxShadow: 'none' }}
            inputProps={{ 'aria-label': 'Without border', style: { padding: '4px 8px' } }}
            MenuProps={{
              PaperProps: {
                style: {
                  boxShadow: 'none',
                },
              },
            }}
          >
            {[5, 10, 25, 50].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body2">
          {`${currentPage} - ${pageCount}`}
        </Typography>

        <IconButton 
          onClick={() => handleChangePage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          <PrevIcon />
        </IconButton>
        <IconButton 
          onClick={() => handleChangePage(currentPage + 1)} 
          disabled={currentPage === pageCount}
        >
          <NextIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default TableView;
