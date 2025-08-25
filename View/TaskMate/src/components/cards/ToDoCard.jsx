import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinearProgress from '@mui/material/LinearProgress';

export function ToDoCard() {
  const tasks = [
    { 
      name: 'Creating Wireframe',
      time: '00:48:00',
      progress: 70
    },
    { 
      name: 'Research Development',
      time: '00:20:00',
      progress: 45
    }
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">To Do</Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tasks.map((task) => (
          <Box key={task.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.time}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={task.progress} 
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: '#FFB020'
                }
              }}
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer', fontWeight: 500 }}
        >
          View Reports
        </Typography>
      </Box>
    </Card>
  );
}
