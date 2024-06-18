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
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button 
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  FileCopy as CopyIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Sales = () => {
  const [salesRecords, setSalesRecords] = useState([
    { 
      saleId: '1', 
      productName: 'Sample Product', 
      quantity: 10,
      saleDate: '2024-06-18',
      totalPrice: 100,
      customerName: 'John Doe'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleCopyURL = () => {
    console.log('Copy URL:', selectedRecord);
    handleMenuClose();
  };

  const handleDownload = () => {
    console.log('Download:', selectedRecord);
    handleMenuClose();
  };

  const handleDelete = () => {
    setSalesRecords(salesRecords.filter(record => record !== selectedRecord));
    handleMenuClose();
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewRecord({});
  };

  const handleNewRecordChange = (event) => {
    setNewRecord({ ...newRecord, [event.target.name]: event.target.value });
  };

  const handleAddRecord = () => {
    setSalesRecords([...salesRecords, newRecord]);
    handleAddDialogClose();
  };

  const filteredSalesRecords = salesRecords.filter(record =>
    record.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-t-4 border-blue-500 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CloudUploadIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
                <h1 className="text-xl font-semibold ml-2">Sales Management</h1>
              </div>
              <div className="relative">
                <TextField
                  type="text"
                  placeholder="Search for sales"
                  value={searchTerm}
                  onChange={handleSearch}
                  variant="outlined"
                  size="small"
                  sx={{ pl: 10, pr: 4, py: 2, borderRadius: 1 }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip title="Settings">
                <IconButton className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <SettingsIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download">
                <IconButton className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <DownloadIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add new sale">
                <IconButton className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={handleAddDialogOpen}>
                  <AddIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 space-x-4 overflow-auto">
        <TableContainer component={Paper} className="shadow-md sm:rounded-lg overflow-auto">
          <Table stickyHeader className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>Sale ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Sale Date</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Customer Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSalesRecords.length > 0 ? (
                filteredSalesRecords.map((record, index) => (
                  <TableRow key={index} className="bg-white border-b">
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, record)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{record.saleId}</TableCell>
                    <TableCell>{record.productName}</TableCell>
                    <TableCell>{record.quantity}</TableCell>
                    <TableCell>{record.saleDate}</TableCell>
                    <TableCell>{record.totalPrice}</TableCell>
                    <TableCell>{record.customerName}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">No data to display</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleCopyURL} sx={{ padding: '12px 20px' }}>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <CopyIcon fontSize="small" sx={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Copy URL" />
          </MenuItem>
          <MenuItem onClick={handleDownload} sx={{ padding: '12px 20px' }}>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <DownloadIcon fontSize="small" sx={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Download record" />
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ padding: '12px 20px' }}>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <DeleteIcon fontSize="small" sx={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Delete record" />
          </MenuItem>
        </Menu>

        {/* Add Record Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
          <DialogTitle>Add New Sale</DialogTitle>
          <DialogContent>
            <TextField
              label="Sale ID"
              name="saleId"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newRecord.saleId || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Product Name"
              name="productName"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newRecord.productName || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Quantity"
              name="quantity"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newRecord.quantity || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Sale Date"
              name="saleDate"
              variant="outlined"
              fullWidth
              margin="dense"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newRecord.saleDate || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Total Price"
              name="totalPrice"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newRecord.totalPrice || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Customer Name"
              name="customerName"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newRecord.customerName || ''}
              onChange={handleNewRecordChange}
              className="mt-2 mb-4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddRecord} color="primary">
              Add Sale
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Sales;
