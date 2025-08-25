import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function RecentActivityCard() {
  return (
    <Card sx={{ p: 3, borderRadius: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src="/path-to-avatar.jpg" alt="Rubik Sans" />
          <Typography variant="subtitle1" fontWeight={500}>
            Rubik Sans
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            View All
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Activity
      </Typography>
      <ImageList sx={{ width: '100%', m: 0 }} cols={3} rowHeight={164} gap={8}>
        {/* Replace with your actual images */}
        {[1, 2, 3, 4, 5].map((item) => (
          <ImageListItem key={item}>
            <img
              src={`/placeholder-image-${item}.jpg`}
              alt={`Activity ${item}`}
              loading="lazy"
              style={{ borderRadius: 8 }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
}
