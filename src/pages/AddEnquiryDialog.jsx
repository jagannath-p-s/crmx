import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Snackbar, Alert } from '@mui/material';
import { useAuth } from './AuthContext';
import { supabase } from './admincomponents/supabaseClient';

const AddEnquiryDialog = ({ open, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    user_name: '',
    mobile_number_one: '',
    mobile_number_two: '',
    customer_code: '',
    salesflow_code: user.id,
    priority: 'low',
    estimated_purchase_price: '',
    pipeline: '',
    currently_assigned_to: '',
    lead_source: '',
    invoiced: false,
    collected: false,
    locality: '',
    address: '',
    remarks: '',
    stage_of_sale: 'lead',
    stage: 'lead'
  });

  const [users, setUsers] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData } = await supabase.from('users').select('id, username');
      const { data: pipelinesData } = await supabase.from('pipelines').select('pipeline_name');
      setUsers(usersData || []);
      setPipelines(pipelinesData || []);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { error: enquiryError } = await supabase.from('enquiries').insert([formData]);

    if (enquiryError) {
      setSnackbar({ open: true, message: `Error: ${enquiryError.message}`, severity: 'error' });
    } else {
      const customerData = {
        customer_name: formData.user_name,
        customer_code: formData.customer_code,
        mobile_number_one: formData.mobile_number_one,
        mobile_number_two: formData.mobile_number_two,
        address: formData.address,
        locality: formData.locality,
        lead_source: formData.lead_source,
        remarks: formData.remarks
      };

      const { error: customerError } = await supabase.from('customers').insert([customerData]);

      if (customerError) {
        setSnackbar({ open: true, message: `Error: ${customerError.message}`, severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'Enquiry and customer added successfully!', severity: 'success' });
        onClose();
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Enquiry</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin="dense"
              name="user_name"
              label="User Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.user_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="mobile_number_one"
              label="Mobile Number 1"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.mobile_number_one}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="mobile_number_two"
              label="Mobile Number 2"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.mobile_number_two}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="customer_code"
              label="Customer Code"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.customer_code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Currently Assigned To</InputLabel>
              <Select
                name="currently_assigned_to"
                value={formData.currently_assigned_to}
                onChange={handleChange}
                label="Currently Assigned To"
              >
                <MenuItem value={user.username}>Me</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Pipeline</InputLabel>
              <Select
                name="pipeline"
                value={formData.pipeline}
                onChange={handleChange}
                label="Pipeline"
              >
                {pipelines.map((pipeline) => (
                  <MenuItem key={pipeline.pipeline_name} value={pipeline.pipeline_name}>{pipeline.pipeline_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Stage of Sale</InputLabel>
              <Select
                name="stage_of_sale"
                value={formData.stage_of_sale}
                onChange={handleChange}
                label="Stage of Sale"
              >
                <MenuItem value="lead">Lead</MenuItem>
                <MenuItem value="prospect">Prospect</MenuItem>
                <MenuItem value="opportunity">Opportunity</MenuItem>
                <MenuItem value="customer won">Customer Won</MenuItem>
                <MenuItem value="customer lost">Customer Lost</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priority"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="lead_source"
              label="Lead Source"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lead_source}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="estimated_purchase_price"
              label="Estimated Purchase Price"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.estimated_purchase_price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="locality"
              label="Locality"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.locality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="remarks"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="outlined">Add Enquiry</Button>
      </DialogActions>
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
    </Dialog>
  );
};

export default AddEnquiryDialog;
