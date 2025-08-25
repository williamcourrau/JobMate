import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function SavedJobsCard() {
  const savedJobs = [
    { 
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'Microsoft',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      logo: 'https://logo.clearbit.com/microsoft.com',
      postedDate: '2d ago'
    },
    { 
      id: 2,
      position: 'Full Stack Engineer',
      company: 'Google',
      location: 'Remote',
      salary: '$100k - $130k',
      logo: 'https://logo.clearbit.com/google.com',
      postedDate: '3d ago'
    }
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Jobs To Apply</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {savedJobs.map((job) => (
          <Box key={job.id} sx={{ display: 'flex', gap: 2 }}>
            <Avatar 
              src={job.logo} 
              alt={job.company}
              variant="rounded"
              sx={{ 
                width: 50, 
                height: 50,
                bgcolor: 'grey.100' // Fallback background color
              }}
              onError={(e) => {
                // If logo fails to load, use the first letter of company name
                e.target.src = '';
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {job.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.company}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {job.location}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  •
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {job.salary}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  •
                </Typography>
                <Typography variant="caption" color="primary">
                  {job.postedDate}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          View Saved Jobs
        </button>
      </Box>
    </Card>
  );
}
