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
  Delete as DeleteIcon,
  Business as BusinessIcon,
  PersonAddAlt as PersonAddAltIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const initialStaffState = {
  username: '',
  useremail: '',
  password: '',
  role: 'Salesman',
  mobile_number: '',
  address: '',
  phone_number: '',
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
      showSnackbar(`Error fetching staff: ${error.message}`, 'error');
    } else {
      const sortedData = data.sort((a, b) => {
        const roleOrder = ['Admin', 'Manager', 'Salesman', 'Service'];
        return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
      });
      setStaffList(sortedData);
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
      const { password, ...updatedStaff } = staff;
      result = await supabase
        .from('users')
        .update(updatedStaff)
        .eq('id', selectedRecord.id);
    }

    const { error } = result;
    if (error) {
      showSnackbar(`Error ${dialogType === 'add' ? 'adding' : 'updating'} staff: ${error.message}`, 'error');
    } else {
      await fetchStaff();
      resetStaffForm();
      showSnackbar(`Staff member ${dialogType === 'add' ? 'added' : 'updated'} successfully`, 'success');
      handleDialogClose();
    }
  };

  const handleEditPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRecord) {
      showSnackbar('No staff member selected for password edit', 'error');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ password: staff.password })
      .eq('id', selectedRecord.id);
    if (error) {
      showSnackbar(`Error updating password: ${error.message}`, 'error');
    } else {
      await fetchStaff();
      resetStaffForm();
      showSnackbar('Password updated successfully', 'success');
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

  const handleDownload = () => {
    const csvContent = [
      ['Username', 'Email', 'Role', 'Mobile Number', 'Phone Number', 'Address'],
      ...staffList.map((staff) => [
        staff.username,
        staff.useremail,
        staff.role,
        staff.mobile_number,
        staff.phone_number,
        staff.address,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'staff_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStaffList = staffList.filter(
    (staff) =>
      staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.useremail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.mobile_number.includes(searchTerm) ||
      staff.phone_number.includes(searchTerm)
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
                sx={{ pl: 1, pr: 1, py: 1, borderRadius: 2 }}
                autoComplete="off"
              />
              <Tooltip title="Add new staff">
                <IconButton
                  className="p-2"
                  onClick={() => handleDialogOpen('add')}
                  style={{ backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '12px' }}
                >
                  <PersonAddAltIcon style={{ fontSize: '1.75rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download CSV">
                <IconButton
                  className="p-2"
                  onClick={handleDownload}
                  style={{ backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '12px' }}
                >
                  <DownloadIcon style={{ fontSize: '1.75rem' }} />
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
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Actions</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Username</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Email</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Role</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Mobile Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Phone Number</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: 'black', maxWidth: '150px' }}>Address</TableCell>
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
                    <TableCell>
                      <Tooltip title={staffMember.address}>
                        <Typography noWrap style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {staffMember.address}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
        <MenuItem onClick={() => handleDialogOpen('edit-password')} sx={{ padding: '12px 20px' }}>
          <ListItemIcon>
            <LockIcon fontSize="small" sx={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Edit Password" />
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'edit-password' ? 'Edit Password' : dialogType === 'add' ? 'Add New Staff Member' : 'Edit Staff Member'}</DialogTitle>
        <form autoComplete="off">
          <DialogContent>
            {dialogType === 'edit-password' ? (
              <TextField
                label="New Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="dense"
                value={staff.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            ) : (
              <>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={staff.username}
                  onChange={handleChange}
                  required
                  autoComplete="off"
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
                  autoComplete="new-email"
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
                    autoComplete="new-password"
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
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Salesman">Salesman</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
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
                  autoComplete="off"
                />
                <TextField
                  label="Phone Number"
                  name="phone_number"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={staff.phone_number}
                  onChange={handleChange}
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={dialogType === 'edit-password' ? handleEditPasswordSubmit : handleSubmit} color="primary">
              {dialogType === 'edit-password' ? 'Update Password' : dialogType === 'add' ? 'Add Staff' : 'Update Staff'}
            </Button>
          </DialogActions>
        </form>
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
