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
  IconButton,
  Typography,
  FormControl,
  Checkbox,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { format, isValid, parseISO } from 'date-fns';

const TableView = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    contactNo: '',
    stage: '',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const tableData = columns.flatMap(column =>
    column.contacts.map(contact => ({
      ...contact,
      name: `${contact.firstName} ${contact.secondName}`,
      stage: column.name,
    }))
  );

  const filteredData = tableData.filter(contact => {
    const contactDate = parseISO(contact.dateCreated);
    const dateFrom = filters.dateFrom ? parseISO(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? parseISO(filters.dateTo) : null;
    return (
      contact.name.toLowerCase().includes(filters.name.toLowerCase()) &&
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
      ['Name', 'Contact No', 'Date Created', 'Stage'],
      ...filteredData.map(contact => [
        contact.name,
        contact.contactNo,
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

  const isSelected = (contact) => 
    selectedRows.some(row => row.contactNo === contact.contactNo);

  const handleSelectRow = (contact) => {
    setSelectedRows(prev =>
      isSelected(contact)
        ? prev.filter(row => row.contactNo !== contact.contactNo)
        : [...prev, contact]
    );
  };

  const handleSelectAllRows = (event) => {
    setSelectedRows(event.target.checked ? [...paginatedData] : []);
  };

  const handleMenuOpen = (event, contact) => {
    setAnchorEl(event.currentTarget);
    setSelectedContact(contact);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Editing:', selectedContact);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Deleting:', selectedContact);
    handleMenuClose();
  };

  return (
    <Paper className="p-6" elevation={3} sx={{ borderRadius: 2 }}>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            size="small"
            value={filters.name}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
            sx={{ minWidth: 120 }}
          />
          <TextField
            label="Mobile No"
            name="contactNo"
            variant="outlined"
            size="small"
            value={filters.contactNo}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
            sx={{ minWidth: 120 }}
          />
          <FormControl variant="outlined" size="small" className="min-w-30">
            <Select
              value={filters.stage}
              name="stage"
              onChange={handleFilterChange}
              displayEmpty
              className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="">All Stages</MenuItem>
              {columns.map(column => (
                <MenuItem key={column.name} value={column.name}>{column.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="From Date"
            name="dateFrom"
            variant="outlined"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
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
            className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
          />
        </div>
        <Tooltip title="Download">
          <IconButton
            color="primary"
            onClick={handleDownload}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </div>

      <TableContainer component={Paper} className="overflow-x-auto max-h-96 rounded-md">
        <Table stickyHeader className="min-w-full">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedData.length}
                  checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                  onChange={handleSelectAllRows}
                />
              </TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Pipeline</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Lead Source</TableCell>
              <TableCell>Invoiced</TableCell>
              <TableCell>Collected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? paginatedData.map((contact, index) => (
              <TableRow key={index} hover selected={isSelected(contact)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(contact)}
                    onChange={() => handleSelectRow(contact)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, contact)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
                <TableCell><a href="#" className="text-blue-500">{contact.name}</a></TableCell>
                <TableCell>{contact.companyName}</TableCell>
                <TableCell>{contact.code}</TableCell>
                <TableCell>{contact.contactNo}</TableCell>
                <TableCell>
                  {isValid(parseISO(contact.dateCreated)) ? format(parseISO(contact.dateCreated), 'dd-MM-yyyy') : 'Invalid date'}
                </TableCell>
                <TableCell>{contact.priority}</TableCell>
                <TableCell>{contact.pipeline}</TableCell>
                <TableCell>{contact.status}</TableCell>
                <TableCell>{contact.assignedTo}</TableCell>
                <TableCell>{contact.leadSource}</TableCell>
                <TableCell>{contact.invoiced}</TableCell>
                <TableCell>{contact.collected}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={16} align="center">No contacts</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-6 flex justify-end items-center gap-4">
        <Typography variant="body2">
          Items per page:
        </Typography>
        <FormControl variant="outlined" size="small" className="border border-gray-300 rounded-md p-2 focus:border-blue-500">
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
          >
            {[5, 10, 25, 50].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body2">
          {`${currentPage} of ${pageCount}`}
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TableView;
