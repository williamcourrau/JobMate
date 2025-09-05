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
  // Función utilitaria para obtener el logo desde el nombre de la empresa
  const getCompanyLogo = (company) => {
    if (!company) return '';
    const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
    return `https://logo.clearbit.com/${domain}`;
  };

  // Estado con datos de ejemplo
  const [applications, setApplications] = useState([]);

  useState(() => {
    fetch("http://localhost:8080/api/jobs")
    .then(response => response.json())
    .then(data => setApplications(data))
    .catch(error => console.error("Error fetching applications:", error));
  }, []);

  // Estados para los modales de vista, alta y edición
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    title: '',
    company: '',
    description: '',
    link: '',
    date: '',
    status: 'applied',
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editApp, setEditApp] = useState(null);

  // Manejo de acciones básicas
  const handleDeleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
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
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] } : app
      )
    );
  };

  // Flujos de alta
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
    setNewApp({
      title: '',
      company: '',
      description: '',
      link: '',
      date: '',
      status: 'applied',
    });
  };

  // Flujos de edición
  const handleEditApplication = (app) => {
    setEditApp({ ...app });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditApp(null);
  };

  const handleEditSubmit = () => {
    setApplications(
      applications.map((app) =>
        app.id === editApp.id ? { ...editApp, lastUpdate: new Date().toISOString().split('T')[0] } : app
      )
    );
    setIsEditOpen(false);
    setEditApp(null);
  };

  // Gestión del color y etiqueta del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'primary';
      case 'interviewing':
        return 'warning';
      case 'offer':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'interviewing':
        return 'Interviewing';
      case 'offer':
        return 'Offer';
      default:
        return 'Unknown';
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

      {/* Tabla de aplicaciones */}
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
              <TableRow key={application.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {application.title}
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar
                      src={getCompanyLogo(application.company)}
                      alt={application.company}
                      sx={{ width: 40, height: 40 }}
                    />
                    {application.company}
                  </div>
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Tooltip title={application.description || 'No description'}>
                    <span>
                      {application.description
                        ? application.description.length > 50
                          ? `${application.description.substring(0, 50)}...`
                          : application.description
                        : 'No description'}
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
                        aria-label="open job link"
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
                        displayEmpty
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
                  <IconButton color="info" onClick={() => handleViewApplication(application)} aria-label="view">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditApplication(application)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteApplication(application.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de vista */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        {selectedApplication && (
          <>
            <DialogTitle>{selectedApplication.title}</DialogTitle>
            <DialogContent dividers>
              <Box display="flex" alignItems="center" mb={2} gap={2}>
                <Avatar
                  src={getCompanyLogo(selectedApplication.company)}
                  alt={selectedApplication.company}
                  sx={{ width: 40, height: 40 }}
                />
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    {selectedApplication.company}
                  </Typography>
                  <Typography variant="body2">
                    Applied on: {new Date(selectedApplication.date).toLocaleDateString()}
                  </Typography>
                </div>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{selectedApplication.description}</Typography>
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
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Modal de alta */}
      <Dialog open={isAddOpen} onClose={handleAddClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Application</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Job Title"
              value={newApp.title}
              onChange={(e) => setNewApp({ ...newApp, title: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Company"
              value={newApp.company}
              onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newApp.description}
              onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Job Link"
              value={newApp.link}
              onChange={(e) => setNewApp({ ...newApp, link: e.target.value })}
              fullWidth
            />
            <TextField
              label="Application Date"
              type="date"
              value={newApp.date}
              onChange={(e) => setNewApp({ ...newApp, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <Select
                value={newApp.status}
                onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
              >
                <MenuItem value="applied">Applied</MenuItem>
                <MenuItem value="interviewing">Interviewing</MenuItem>
                <MenuItem value="offer">Offer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Application</DialogTitle>
        <DialogContent dividers>
          {editApp && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Job Title"
                value={editApp.title}
                onChange={(e) => setEditApp({ ...editApp, title: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Company"
                value={editApp.company}
                onChange={(e) => setEditApp({ ...editApp, company: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={editApp.description}
                onChange={(e) => setEditApp({ ...editApp, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <TextField
                label="Job Link"
                value={editApp.link}
                onChange={(e) => setEditApp({ ...editApp, link: e.target.value })}
                fullWidth
              />
              <TextField
                label="Application Date"
                type="date"
                value={editApp.date}
                onChange={(e) => setEditApp({ ...editApp, date: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Last Update"
                type="date"
                value={editApp.lastUpdate}
                onChange={(e) => setEditApp({ ...editApp, lastUpdate: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth>
                <Select
                  value={editApp.status}
                  onChange={(e) => setEditApp({ ...editApp, status: e.target.value })}
                >
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interviewing">Interviewing</MenuItem>
                  <MenuItem value="offer">Offer</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
