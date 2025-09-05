import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

// Utilidad para obtener el logo dinámicamente
const getCompanyLogo = (company) => {
  if (!company) return '';
  const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
  return `https://logo.clearbit.com/${domain}`;
};

export function JobsList() {
  const [savedJobs, setSavedJobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/jobs")
    .then(response => response.json())
    .then(data => setSavedJobs(data))
    .catch(error => console.error("Error fetching jobs:", error));
  }, []);
}

  // Handler para añadir un nuevo empleo (podrías adaptarlo a un formulario o modal)
  const addJob = (job) => {
    setSavedJobs([...savedJobs, { id: savedJobs.length + 1, ...job }]);
  };

export const SavedJobsList = ({ savedJobs, onRemove }) => 
    {
    return (
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {savedJobs.map((job, index) => (
            <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={job.companyLogo} alt={job.companyName} sx={{ mr: 2 }} />
                <Box>
                    <Typography variant="h6">{job.jobTitle}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                    {job.companyName} - {job.location}
                    </Typography>
                </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Saved on: {new Date(job.dateSaved).toLocaleDateString()}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Tooltip title="View Job Posting" arrow>
                    <Button
                    variant="outlined"
                    color="primary"
                    href={job.jobLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    View Job
                    </Button>
                </Tooltip>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onRemove(job.id)}
                >
                    Remove
                </Button>
                </Box>
            </CardContent>
            </Card>
        ))}
        {savedJobs.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
            No saved jobs.
            </Typography>
        )}
        </Box>
    );
}