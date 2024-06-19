import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { format, parseISO, isValid } from 'date-fns';
import './Activities.css'; // Import the CSS file

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'date', headerName: 'Date', width: 130, valueFormatter: ({ value }) => {
    if (!value) return 'Invalid date';
    const parsedDate = parseISO(value);
    return isValid(parsedDate) ? format(parsedDate, 'dd-MM-yyyy') : 'Invalid date';
  }},
];

const initialRows = [
  { id: 1, description: 'Meeting with client', date: '2024-06-18' },
  { id: 2, description: 'Project presentation', date: '2024-06-19' },
  // Additional rows can be added here
];

const Activities = () => {
  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newRow, setNewRow] = useState({ id: '', description: '', date: '' });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Description', 'Date'],
      ...rows.map(row => [row.id, row.description, row.date]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'activities.csv');
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewRow({ id: '', description: '', date: '' });
  };

  const handleNewRowChange = (event) => {
    setNewRow({ ...newRow, [event.target.name]: event.target.value });
  };

  const handleAddRow = () => {
    setRows([...rows, { ...newRow, id: rows.length + 1 }]);
    handleAddDialogClose();
  };

  const filteredRows = rows.filter(row =>
    Object.values(row).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Paper className="p-6 m-6" elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-2 focus:border-blue-500"
          sx={{ minWidth: 200 }}
        />
        <div className="flex items-center space-x-4">
          <Tooltip title="Download">
            <IconButton color="primary" onClick={handleDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add new row">
            <IconButton color="primary" onClick={handleAddDialogOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #e0e0e0',
            },
          }}
        />
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => console.log('Edit', selectedRow)} sx={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={() => console.log('Delete', selectedRow)} sx={{ padding: '10px 20px' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            margin="dense"
            value={newRow.description}
            onChange={handleNewRowChange}
            className="mt-2 mb-4"
          />
          <TextField
            label="Date"
            name="date"
            variant="outlined"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newRow.date}
            onChange={handleNewRowChange}
            className="mt-2 mb-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRow} color="primary">
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Activities;
