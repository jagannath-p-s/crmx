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
  Typography,
  FormControl,
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

const Stock = () => {
  const [stockItems, setStockItems] = useState([
    { 
      productName: 'Sample Product', 
      unitPrice: 10, 
      quantity: 50,
      threshold: 10, 
      overstock: 100,
      description: 'Sample product description'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleCopyURL = () => {
    console.log('Copy URL:', selectedItem);
    handleMenuClose();
  };

  const handleDownload = () => {
    console.log('Download:', selectedItem);
    handleMenuClose();
  };

  const handleDelete = () => {
    setStockItems(stockItems.filter(item => item !== selectedItem));
    handleMenuClose();
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewItem({});
  };

  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAddItem = () => {
    setStockItems([...stockItems, newItem]);
    handleAddDialogClose();
  };

  const filteredStockItems = stockItems.filter(item =>
    item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-xl font-semibold ml-2">Stock Management</h1>
              </div>
              <div className="relative">
                <TextField
                  type="text"
                  placeholder="Search for products"
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
              <Tooltip title="Add new item">
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
                <TableCell>Product Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Threshold</TableCell>
                <TableCell>Overstock</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStockItems.length > 0 ? (
                filteredStockItems.map((item, index) => (
                  <TableRow key={index} className="bg-white border-b">
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.unitPrice}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.threshold}</TableCell>
                    <TableCell>{item.overstock}</TableCell>
                    <TableCell>{item.description}</TableCell>
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
            <ListItemText primary="Download file" />
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ padding: '12px 20px' }}>
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <DeleteIcon fontSize="small" sx={{ fontSize: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Delete file" />
          </MenuItem>
        </Menu>

        {/* Add Item Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Product Name"
              name="productName"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.productName || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Unit Price"
              name="unitPrice"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.unitPrice || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Quantity"
              name="quantity"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.quantity || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Threshold"
              name="threshold"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.threshold || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Overstock"
              name="overstock"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.overstock || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newItem.description || ''}
              onChange={handleNewItemChange}
              className="mt-2 mb-4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddItem} color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Stock;
