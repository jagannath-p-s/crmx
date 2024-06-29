import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import {
  TextField, Button, IconButton, Tooltip, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle, 
  Snackbar, Alert, FormControl,
  Select, InputLabel, Box, Typography, Accordion, AccordionSummary,
  AccordionDetails, Chip, FormControlLabel, Checkbox
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Equalizer as EqualizerIcon, ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const [pipelineStages, setPipelineStages] = useState([]);
  const [pipelineFields, setPipelineFields] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedField, setSelectedField] = useState(null);
  const [dialogOpen, setDialogOpen] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newPipelineName, setNewPipelineName] = useState('');
  const [newStageName, setNewStageName] = useState('');
  const [newFieldName, setNewFieldName] = useState('');
  const [isFile, setIsFile] = useState(false);

  useEffect(() => {
    fetchPipelines();
    fetchPipelineStages();
    fetchPipelineFields();
  }, []);

  const fetchPipelines = async () => {
    const { data, error } = await supabase.from('pipelines').select('*');
    if (error) {
      showSnackbar(`Error fetching pipelines: ${error.message}`, 'error');
    } else {
      setPipelines(data);
    }
  };

  const fetchPipelineStages = async () => {
    const { data, error } = await supabase.from('pipeline_stages').select('*');
    if (error) {
      showSnackbar(`Error fetching pipeline stages: ${error.message}`, 'error');
    } else {
      setPipelineStages(data);
    }
  };

  const fetchPipelineFields = async () => {
    const { data, error } = await supabase.from('pipeline_fields').select('*');
    if (error) {
      showSnackbar(`Error fetching pipeline fields: ${error.message}`, 'error');
    } else {
      setPipelineFields(data);
    }
  };

  const handleOpenDialog = (type, pipelineId = '', stageId = '', field = null) => {
    setSelectedPipeline(pipelineId);
    setSelectedStage(stageId);
    setSelectedField(field);
    setDialogOpen(type);
  };

  const handleCloseDialog = () => {
    setDialogOpen('');
    setSelectedPipeline('');
    setSelectedStage('');
    setSelectedField(null);
    setNewPipelineName('');
    setNewStageName('');
    setNewFieldName('');
    setIsFile(false);
  };

  const handleAddPipeline = async () => {
    const { error } = await supabase.from('pipelines').insert([{ pipeline_name: newPipelineName }]);
    if (error) {
      showSnackbar(`Error adding pipeline: ${error.message}`, 'error');
    } else {
      showSnackbar('Pipeline added successfully', 'success');
      fetchPipelines();
      handleCloseDialog();
    }
  };

  const handleAddStage = async () => {
    const { error } = await supabase.from('pipeline_stages').insert([{ pipeline_id: selectedPipeline, stage_name: newStageName }]);
    if (error) {
      showSnackbar(`Error adding stage: ${error.message}`, 'error');
    } else {
      showSnackbar('Stage added successfully', 'success');
      fetchPipelineStages();
      handleCloseDialog();
    }
  };

  const handleAddField = async () => {
    const { error } = await supabase
      .from('pipeline_fields')
      .insert([{ stage_id: selectedStage, field_name: newFieldName, is_file: isFile }]);

    if (error) {
      showSnackbar(`Error adding field: ${error.message}`, 'error');
    } else {
      showSnackbar('Field added successfully', 'success');
      fetchPipelineFields();
      handleCloseDialog();
    }
  };

  const handleEditPipeline = (pipeline) => {
    setSelectedPipeline(pipeline.pipeline_id);
    setNewPipelineName(pipeline.pipeline_name);
    setDialogOpen('pipeline');
  };

  const handleEditStage = (stage) => {
    setSelectedStage(stage.stage_id);
    setSelectedPipeline(stage.pipeline_id);
    setNewStageName(stage.stage_name);
    setDialogOpen('stage');
  };

  const handleEditField = (field) => {
    setSelectedField(field.field_id);
    setSelectedStage(field.stage_id);
    setNewFieldName(field.field_name);
    setIsFile(field.is_file);
    setDialogOpen('field');
  };

  const handleDeletePipeline = (pipeline_id) => {
    setSelectedPipeline(pipeline_id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteStage = (stage_id) => {
    setSelectedStage(stage_id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteField = (field_id) => {
    setSelectedField(field_id);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePipeline = async () => {
    const { error } = await supabase.from('pipelines').delete().eq('pipeline_id', selectedPipeline);
    if (error) {
      showSnackbar(`Error deleting pipeline: ${error.message}`, 'error');
    } else {
      showSnackbar('Pipeline deleted successfully', 'success');
      fetchPipelines();
      setDeleteDialogOpen(false);
    }
  };

  const confirmDeleteStage = async () => {
    const { error } = await supabase.from('pipeline_stages').delete().eq('stage_id', selectedStage);
    if (error) {
      showSnackbar(`Error deleting stage: ${error.message}`, 'error');
    } else {
      showSnackbar('Stage deleted successfully', 'success');
      fetchPipelineStages();
      setDeleteDialogOpen(false);
    }
  };

  const confirmDeleteField = async () => {
    const { error } = await supabase.from('pipeline_fields').delete().eq('field_id', selectedField);
    if (error) {
      showSnackbar(`Error deleting field: ${error.message}`, 'error');
    } else {
      showSnackbar('Field deleted successfully', 'success');
      fetchPipelineFields();
      setDeleteDialogOpen(false);
    }
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white shadow-md border-b border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-2">
              <EqualizerIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <Tooltip title="Add Pipeline">
              <IconButton onClick={() => handleOpenDialog('pipeline')} style={{ backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '12px' }}>
                <AddIcon style={{ fontSize: '1.75rem' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <Typography variant="h6" gutterBottom>
          Pipelines, Stages, and Fields
        </Typography>
        {pipelines.map((pipeline) => (
          <Accordion key={pipeline.pipeline_id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{pipeline.pipeline_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent="flex-end" mb={1}>
                <Tooltip title="Add Stage">
                  <IconButton onClick={() => handleOpenDialog('stage', pipeline.pipeline_id)} style={{ backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '12px' }}>
                    <AddIcon style={{ fontSize: '1.75rem' }} />
                  </IconButton>
                </Tooltip>
              </Box>
              {pipelineStages
                .filter((stage) => stage.pipeline_id === pipeline.pipeline_id)
                .map((stage) => (
                  <Accordion key={stage.stage_id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{stage.stage_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box display="flex" justifyContent="flex-end" mb={1}>
                        <Tooltip title="Add Field">
                          <IconButton onClick={() => handleOpenDialog('field', pipeline.pipeline_id, stage.stage_id)} style={{ backgroundColor: '#e3f2fd', color: '#1e88e5', borderRadius: '12px' }}>
                            <AddIcon style={{ fontSize: '1.75rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      {pipelineFields
                        .filter((field) => field.stage_id === stage.stage_id)
                        .map((field) => (
                          <Box key={field.field_id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography>{field.field_name}</Typography>
                            <Box display="flex" alignItems="center">
                              <Chip
                                label={field.is_file ? 'File' : 'Text'}
                                color={field.is_file ? 'primary' : 'default'}
                                size="small"
                                style={{ marginRight: 8 }}
                              />
                              <IconButton onClick={() => handleEditField(field)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteField(field.field_id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <Dialog open={dialogOpen === 'pipeline'} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{selectedPipeline ? 'Edit Pipeline' : 'Add Pipeline'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Pipeline Name"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newPipelineName}
              onChange={(e) => setNewPipelineName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPipeline} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen === 'stage'} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{selectedStage ? 'Edit Stage' : 'Add Stage'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Pipeline</InputLabel>
              <Select
                value={selectedPipeline}
                onChange={(e) => setSelectedPipeline(e.target.value)}
                label="Pipeline"
              >
                {pipelines.map((pipeline) => (
                  <MenuItem key={pipeline.pipeline_id} value={pipeline.pipeline_id}>
                    {pipeline.pipeline_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Stage Name"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen === 'field'} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{selectedField ? 'Edit Field' : 'Add Field'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Stage</InputLabel>
              <Select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                label="Stage"
              >
                {pipelineStages.map((stage) => (
                  <MenuItem key={stage.stage_id} value={stage.stage_id}>
                    {stage.stage_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Field Name"
              variant="outlined"
              fullWidth
              margin="dense"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFile}
                  onChange={(e) => setIsFile(e.target.checked)}
                  name="isFile"
                />
              }
              label="Is File"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddField} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography>Are you sure you want to delete this item?</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedPipeline) confirmDeletePipeline();
              else if (selectedStage) confirmDeleteStage();
              else if (selectedField) confirmDeleteField();
            }}
            color="primary"
          >
            Delete
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

export default Dashboard;
