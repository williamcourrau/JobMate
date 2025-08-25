import React, { useState } from 'react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar.jsx';
import { JobContent } from '../../components/JobContent.jsx';

const HomeContent = () => (
  <div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
      {<JobContent></JobContent>}
  </div>
);

const MyApplicationsContent = () => (
<div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
    <div className="px-4">
      <h1>My Applications</h1>
      <p>Track all your job applications and their current status.</p>
      {/* Add your applications content here */}
    </div>
  </div>
);

const SavedJobsContent = () => (
  <div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
    <div className="px-4">
      <h1>Saved Jobs</h1>
      <p>View all the jobs you've saved for later review.</p>
      {/* Add your saved jobs content here */}
    </div>
  </div>
);

export const TaskManagement = () => {
  
  type ViewType = 'home' | 'applications' | 'saved';
  
  const [activeView, setActiveView] = useState<ViewType>('home');

  const contentComponents: Record<ViewType, React.ComponentType> = {
    home: HomeContent,
    applications: MyApplicationsContent,
    saved: SavedJobsContent,
  };

  console.log('Active View:', activeView);

  const ActiveContent = contentComponents[activeView] || MyApplicationsContent;

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="d-flex flex-grow-1">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <ActiveContent />
      </div>
    </div>
  );
}