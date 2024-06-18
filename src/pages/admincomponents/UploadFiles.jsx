import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/FileCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, Button, ListItemIcon, ListItemText } from '@mui/material';

const UploadFiles = () => {
  const [files, setFiles] = useState([
    { fileName: 'Screenshot from 2024-06-18 11-57-33.png', uploadedDate: 'Jun 18, 2024' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleCopyURL = () => {
    // Logic to copy URL
    console.log('Copy URL:', selectedFile);
    handleMenuClose();
  };

  const handleDownload = () => {
    // Logic to download file
    console.log('Download:', selectedFile);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Logic to delete file
    console.log('Delete:', selectedFile);
    handleMenuClose();
  };

  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFiles([]);
    setFileName('');
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleFileUpload = () => {
    // Logic to handle file upload with selected filename
    console.log('Files uploaded:', selectedFiles);
    console.log('Filename:', fileName);
    // Reset the selected files and filename
    setSelectedFiles([]);
    setFileName('');
    handleCloseUploadDialog();
  };

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CloudUploadIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
                <h1 className="text-xl font-semibold ml-2">Upload Files</h1>
              </div>
              <div className="relative">
                <TextField
                  type="text"
                  placeholder="Search for files"
                  value={searchTerm}
                  onChange={handleSearch}
                  variant="outlined"
                  size="small"
                  sx={{ pl: 10, pr: 4, py: 2, borderRadius: 1 }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip title="Add new file">
                <IconButton className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" onClick={handleOpenUploadDialog}>
                  <AddIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 space-x-4 overflow-x-auto">
        <TableContainer component={Paper} className="shadow-md sm:rounded-lg">
          <Table className="w-full text-sm text-left text-gray-500">
            <TableHead className="text-xs text-gray-700 uppercase bg-gray-50">
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell>Uploaded Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFiles.map((file, index) => (
                <TableRow key={index} className="bg-white border-b">
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.uploadedDate}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(event) => handleMenuOpen(event, file)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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

        {/* File Upload Dialog */}
        <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog}>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogContent>
            <TextField
              label="File Name"
              variant="outlined"
              fullWidth
              margin="dense"
              value={fileName}
              onChange={handleFileNameChange}
              className="mt-2 mb-4"
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-2 mb-4 w-full text-gray-700 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUploadDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleFileUpload} color="primary">
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UploadFiles;
