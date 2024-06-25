import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  Alert,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  PersonAddAlt as PersonAddAltIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const initialStaffState = {
  username: '',
  useremail: '',
  password: '',  // Added password field to the initial state
  role: 'salesman',
  mobile_number: '',
  address: '',
  phone_number: '',
  resume_link: '',
};

const Organisation = () => {
  const [staff, setStaff] = useState(initialStaffState);
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching staff:', error);
      showSnackbar(`Error fetching staff: ${error.message}`, 'error');
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
    if (dialogType === 'edit' && !selectedRecord) {
      showSnackbar('No staff member selected for editing', 'error');
      return;
    }

    let result;
    if (dialogType === 'add') {
      result = await supabase.from('users').insert([staff]);
    } else if (dialogType === 'edit') {
      const { password, ...updatedStaff } = staff;  // Exclude password when editing
      result = await supabase
        .from('users')
        .update(updatedStaff)
        .eq('id', selectedRecord.id);
    }

    const { error } = result;
    if (error) {
      console.error(`Error ${dialogType === 'add' ? 'adding' : 'updating'} staff:`, error);
      showSnackbar(`Error ${dialogType === 'add' ? 'adding' : 'updating'} staff: ${error.message}`, 'error');
    } else {
      await fetchStaff();
      resetStaffForm();
      showSnackbar(`Staff member ${dialogType === 'add' ? 'added' : 'updated'} successfully`, 'success');
      handleDialogClose();
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) {
      showSnackbar('No staff member selected for deletion', 'error');
      return;
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', selectedRecord.id);
    if (error) {
      console.error('Error deleting staff:', error);
      showSnackbar(`Error deleting staff: ${error.message}`, 'error');
    } else {
      await fetchStaff();
      showSnackbar('Staff member deleted successfully', 'success');
      handleMenuClose();
    }
  };

  const handleMenuOpen = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStaffList = staffList.filter(
    (staff) =>
      staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.useremail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDialogOpen = (type) => {
    setDialogType(type);
    if (type === 'edit' && selectedRecord) {
      setStaff(selectedRecord);
    } else if (type === 'add') {
      resetStaffForm();
    }
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetStaffForm();
    setSelectedRecord(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const resetStaffForm = () => {
    setStaff(initialStaffState);
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
                  onClick={() => handleDialogOpen('add')}
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
                filteredStaffList.map((staffMember) => (
                  <TableRow key={staffMember.id} className="bg-white border-b">
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, staffMember)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{staffMember.username}</TableCell>
                    <TableCell>{staffMember.useremail}</TableCell>
                    <TableCell>{staffMember.role}</TableCell>
                    <TableCell>{staffMember.mobile_number}</TableCell>
                    <TableCell>{staffMember.phone_number}</TableCell>
                    <TableCell>{staffMember.address}</TableCell>
                    <TableCell>
                      {staffMember.resume_link && (
                        <Link href={staffMember.resume_link} target="_blank" rel="noopener">
                          View Resume
                        </Link>
                      )}
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
        <MenuItem onClick={() => handleDialogOpen('edit')} sx={{ padding: '12px 20px' }}>
          <ListItemIcon>
            <EditIcon fontSize="small" sx={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Edit record" />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ padding: '12px 20px' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Delete record" />
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'add' ? 'Add New Staff Member' : 'Edit Staff Member'}</DialogTitle>
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
          {dialogType === 'add' && (
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="dense"
              value={staff.password}
              onChange={handleChange}
              required
            />
          )}
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
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {dialogType === 'add' ? 'Add Staff' : 'Update Staff'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Organisation;
