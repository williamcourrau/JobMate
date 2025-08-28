import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

export function JobApplicationsTable() {
  const [applications, setApplications] = useState([
    { 
      id: 1, 
      title: 'Frontend Developer', 
      company: 'ABC Corp', 
      logo: 'https://via.placeholder.com/40x40.png?text=A', 
      date: '2025-08-10',
      description: 'React.js developer position with focus on modern web applications',
      link: 'https://example.com/job/frontend-dev',
      status: 'applied',
      lastUpdate: '2025-08-15'
    },
    { 
      id: 2, 
      title: 'Backend Engineer', 
      company: 'XYZ Inc', 
      logo: 'https://via.placeholder.com/40x40.png?text=X',
      date: '2025-08-12',
      description: 'Node.js and Python backend development role',
      link: 'https://example.com/job/backend-eng',
      status: 'interviewing',
      lastUpdate: '2025-08-20'
    },
  ]);

  // View modal
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    title: '',
    company: '',
    logo: '',
    description: '',
    link: '',
    date: '',
    status: 'applied',
  });

  // Edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editApp, setEditApp] = useState(null);

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };
  
  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] } : app
    ));
  };

  // Add flow
  const handleAddOpen = () => setIsAddOpen(true);
  const handleAddClose = () => setIsAddOpen(false);

  const handleAddSubmit = () => {
    const newApplication = {
      id: applications.length + 1,
      ...newApp,
      lastUpdate: new Date().toISOString().split('T')[0],
    };
    setApplications([...applications, newApplication]);
    setIsAddOpen(false);
    setNewApp({ title: '', company: '', logo: '', description: '', link: '', date: '', status: 'applied' });
  };

  // Edit flow
  const handleEditApplication = (app) => {
    setEditApp({ ...app });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditApp(null);
  };

  const handleEditSubmit = () => {
    setApplications(applications.map(app => 
      app.id === editApp.id ? { ...editApp, lastUpdate: new Date().toISOString().split('T')[0] } : app
    ));
    setIsEditOpen(false);
    setEditApp(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'primary';
      case 'interviewing': return 'warning';
      case 'offer': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'applied': return 'Applied';
      case 'interviewing': return 'Interviewing';
      case 'offer': return 'Offer';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Job Applications</h2>
        <Button variant="contained" onClick={handleAddOpen}>
          Add Application
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="job applications table">
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Job Link</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.title}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={application.logo} alt={application.company} />
                    {application.company}
                  </Box>
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Tooltip title={application.description || 'No description'}>
                    <span>
                      {application.description 
                        ? application.description.length > 50 
                            ? `${application.description.substring(0, 50)}...`
                            : application.description
                        : 'No description'
                      }
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {application.link ? (
                    <Tooltip title="Open job posting">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => window.open(application.link, '_blank')}
                      >
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <span style={{ color: '#999' }}>No link</span>
                  )}
                </TableCell>
                <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={application.status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      >
                        <MenuItem value="applied">Applied</MenuItem>
                        <MenuItem value="interviewing">Interviewing</MenuItem>
                        <MenuItem value="offer">Offer</MenuItem>
                      </Select>
                    </FormControl>
                    <Chip 
                      label={getStatusLabel(application.status)} 
                      color={getStatusColor(application.status)}
                      size="small"
                    />
                  </div>
                </TableCell>
                <TableCell>{new Date(application.lastUpdate).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton color="info" onClick={() => handleViewApplication(application)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEditApplication(application)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteApplication(application.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ View Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        {selectedApplication && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={selectedApplication.logo} alt={selectedApplication.company} />
                <div>
                  <Typography variant="h6">{selectedApplication.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {selectedApplication.company}
                  </Typography>
                </div>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" gutterBottom>
                Applied on: {new Date(selectedApplication.date).toLocaleDateString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                {selectedApplication.description}
              </Typography>
              {selectedApplication.link && (
                <Box mt={2}>
                  <Button
                    href={selectedApplication.link}
                    target="_blank"
                    variant="outlined"
                    startIcon={<LinkIcon />}
                  >
                    View Job Posting
                  </Button>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ✅ Add Modal */}
      <Dialog open={isAddOpen} onClose={handleAddClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Job Title" value={newApp.title} onChange={(e) => setNewApp({ ...newApp, title: e.target.value })} />
            <TextField label="Company" value={newApp.company} onChange={(e) => setNewApp({ ...newApp, company: e.target.value })} />
            <TextField label="Logo URL" value={newApp.logo} onChange={(e) => setNewApp({ ...newApp, logo: e.target.value })} />
            <TextField label="Description" value={newApp.description} onChange={(e) => setNewApp({ ...newApp, description: e.target.value })} multiline rows={3} />
            <TextField label="Job Link" value={newApp.link} onChange={(e) => setNewApp({ ...newApp, link: e.target.value })} />
            <TextField type="date" label="Application Date" InputLabelProps={{ shrink: true }} value={newApp.date} onChange={(e) => setNewApp({ ...newApp, date: e.target.value })} />
            <FormControl>
              <Select value={newApp.status} onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}>
                <MenuItem value="applied">Applied</MenuItem>
                <MenuItem value="interviewing">Interviewing</MenuItem>
                <MenuItem value="offer">Offer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Edit Modal */}
      <Dialog open={isEditOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Application</DialogTitle>
        {editApp && (
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Job Title" value={editApp.title} onChange={(e) => setEditApp({ ...editApp, title: e.target.value })} />
              <TextField label="Company" value={editApp.company} onChange={(e) => setEditApp({ ...editApp, company: e.target.value })} />
              <TextField label="Logo URL" value={editApp.logo} onChange={(e) => setEditApp({ ...editApp, logo: e.target.value })} />
              <TextField label="Description" value={editApp.description} onChange={(e) => setEditApp({ ...editApp, description: e.target.value })} multiline rows={3} />
              <TextField label="Job Link" value={editApp.link} onChange={(e) => setEditApp({ ...editApp, link: e.target.value })} />
              <TextField type="date" label="Application Date" InputLabelProps={{ shrink: true }} value={editApp.date} onChange={(e) => setEditApp({ ...editApp, date: e.target.value })} />
              <FormControl>
                <Select value={editApp.status} onChange={(e) => setEditApp({ ...editApp, status: e.target.value })}>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interviewing">Interviewing</MenuItem>
                  <MenuItem value="offer">Offer</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
