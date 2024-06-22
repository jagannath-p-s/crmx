import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  Container,
  Typography,
  TextField,
  Button,  // Ensure Button is imported here
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  Link,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  PersonAddAlt as PersonAddAltIcon, // Changed the Add icon
} from '@mui/icons-material';

const Organisation = () => {
  const [staff, setStaff] = useState({
    username: '',
    useremail: '',
    password: '',
    role: 'admin',
    mobile_number: '',
    address: '',
    phone_number: '',
    resume_link: '',
  });

  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error fetching staff list' });
    } else {
      setStaffList(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('users').insert([staff]);
    if (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error adding staff member' });
    } else {
      setStaffList([...staffList, data[0]]);
      setStaff({
        username: '',
        useremail: '',
        password: '',
        role: 'admin',
        mobile_number: '',
        address: '',
        phone_number: '',
        resume_link: '',
      });
      setSnackbar({ open: true, message: 'Staff member added successfully' });
      handleAddDialogClose();
    }
  };

  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStaffList = staffList.filter((staff) =>
    staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.useremail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEdit = () => {
    console.log('Editing:', selectedRecord);
    handleMenuClose();
  };

  const handleDelete = () => {
    setStaffList(staffList.filter((record) => record !== selectedRecord));
    handleMenuClose();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BusinessIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
                <h1 className="text-xl font-semibold ml-2">Organization</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TextField
                type="text"
                placeholder="Search for staff"
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                size="small"
                sx={{ pl: 1, pr: 1, py: 1, borderRadius: 1 }}
              />
              <Tooltip title="Add new staff">
                <IconButton
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  onClick={handleAddDialogOpen}
                >
                  <PersonAddAltIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <SettingsIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 space-x-4 overflow-x-auto">
        <TableContainer component={Paper} className="shadow-md sm:rounded-lg overflow-auto">
          <Table stickyHeader className="min-w-full">
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Resume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaffList.length > 0 ? (
                filteredStaffList.map((staff, index) => (
                  <TableRow key={index} className="bg-white border-b">
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, staff)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.useremail}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.mobile_number}</TableCell>
                    <TableCell>{staff.phone_number}</TableCell>
                    <TableCell>{staff.address}</TableCell>
                    <TableCell>
                      <Link href={staff.resume_link} target="_blank" rel="noopener">
                        View Resume
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit} sx={{ padding: '12px 20px' }}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ padding: '12px 20px' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Delete record" />
        </MenuItem>
      </Menu>

      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Staff Member</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="dense"
            value={staff.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="useremail"
            variant="outlined"
            fullWidth
            margin="dense"
            value={staff.useremail}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="dense"
            type="password"
            value={staff.password}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={staff.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="salesman">Salesman</MenuItem>
              <MenuItem value="service">Service</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Mobile Number"
            name="mobile_number"
            variant="outlined"
            fullWidth
            margin="dense"
            value={staff.mobile_number}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            variant="outlined"
            fullWidth
            margin="dense"
            value={staff.phone_number}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            margin="dense"
            multiline
            rows={2}
            value={staff.address}
            onChange={handleChange}
          />
          <TextField
            label="Resume Link"
            name="resume_link"
            variant="outlined"
            fullWidth
            margin="dense"
            value={staff.resume_link}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Staff
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </div>
  );
};

export default Organisation;
