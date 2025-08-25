import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderInIcon from '@mui/icons-material/FolderOpen';
import InprogressIcon from '@mui/icons-material/CheckCircle';
import AppliedIcon from '@mui/icons-material/AssignmentTurnedIn';
import { InsightCard } from './InsightCard';
import { RecentActivityCard } from './cards/RecentActivityCard';
import { ProjectsCard } from './cards/ProjectsCard';
import { SavedJobsCard } from './cards/SavedJobsCard';
import { ToDoCard } from './cards/ToDoCard';
import { KeyWordsCard } from './cards/KeyWordsCard';

const cards = [
  {
    id: 1,
    title: 'LinkedIn Profile',
  }
];

export function JobContent() {
  return (
    <div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <header style={{ paddingLeft: '30px', paddingTop: '20px' }}>
          <h1 className="flex-grow-1 mb-6">Today</h1>
          <small className="text-muted">Mon 22, 2021 | 10:00AM</small>
        </header>
        <div className="ms-auto" style={{ width: '300px', paddingTop: '20px', paddingRight: '30px' }}>
          {cards.map((card) => (
            <Card
              key={card.id}
              className="mb-0"
              sx={{
                width: '100%',
                '&:hover': {
                  boxShadow: 3,
                  transition: 'box-shadow 0.3s ease-in-out'
                }
              }}
            >
              <CardActionArea
                onClick={() => setSelectedCard(card.id)}
                className="py-4 px-4"
                sx={{ height: '100%' }}
              >
                <Box className="d-flex align-items-center">
                  <LinkedInIcon className="me-3" sx={{ color: '#0A66C2', fontSize: 24 }} />
                  <Typography variant="inherit">
                    {card.title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
      <div className="px-4">
        <div className="d-flex flex-wrap gap-4 mb-4">
          <InsightCard title="Active Applicants" number="0" icon={<FolderInIcon sx={{ color: '#FABB18' }} />} />
          <InsightCard title="Interviewing" number="0" icon={<InprogressIcon sx={{ color: '#FABB18' }} />} />
          <InsightCard title="Applied Positions" number="0" icon={<AppliedIcon sx={{ color: '#FABB18' }} />} />
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <ProjectsCard />
          </div>
          <div className="col-md-6 d-flex flex-column gap-4">
            <SavedJobsCard />
            <KeyWordsCard />
          </div>
        </div>
      </div>
    </div>
  );
}