import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';

export function ProjectsCard() {
  const companies = [
    {
      name: 'Google',
      currentStage: 'Technical Interview',
      status: 'Scheduled for Aug 15',
      lastUpdate: '2 days ago'
    },
    {
      name: 'Microsoft',
      currentStage: 'Initial Screening',
      status: 'Completed',
      lastUpdate: '1 day ago'
    },
    {
      name: 'Amazon',
      currentStage: 'Application Submitted',
      status: 'Under Review',
      lastUpdate: '3 days ago'
    },
    {
      name: 'Meta',
      currentStage: 'Final Interview',
      status: 'Scheduled for Aug 14',
      lastUpdate: '5 hours ago'
    },
    {
      name: 'Apple',
      currentStage: 'Offer Stage',
      status: 'Pending Response',
      lastUpdate: '1 hour ago'
    }
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Job Applications</Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      
      {/* Header */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 2fr 1fr 1fr',
        gap: 2,
        mb: 2,
        px: 2
      }}>
        <Typography variant="caption" color="text.secondary">Company</Typography>
        <Typography variant="caption" color="text.secondary">Current Stage</Typography>
        <Typography variant="caption" color="text.secondary">Status</Typography>
        <Typography variant="caption" color="text.secondary">Last Update</Typography>
      </Box>

      {/* Company Rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {companies.map((company) => (
          <Box key={company.name} sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1fr 1fr',
            gap: 2,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{company.name}</Typography>
            <Typography variant="body2" sx={{ 
              color: 
                company.currentStage === 'Offer Stage' ? 'success.main' :
                company.currentStage === 'Final Interview' ? 'warning.main' :
                company.currentStage === 'Technical Interview' ? 'primary.main' :
                'text.secondary',
              fontWeight: 500
            }}>
              {company.currentStage}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 
                company.status.includes('Scheduled') ? 'info.main' :
                company.status === 'Completed' ? 'success.main' :
                company.status === 'Under Review' ? 'warning.main' :
                'text.secondary'
            }}>
              {company.status}
            </Typography>
            <Typography variant="caption" color="text.secondary">{company.lastUpdate}</Typography>
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
          View All Applications
        </button>
      </Box>
    </Card>
  );
}
