import React, { useState } from 'react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar.jsx';
import { HomeContent } from '../../components/HomeContent.jsx';
import { JobApplicationsTable } from '../../components/JobApplicationsTable.jsx';

const MainHomeContent = () => (
  <div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
      {<HomeContent></HomeContent>}
  </div>
);

const MyApplicationsContent = () => (
<div className="flex-grow-1 p-4 bg-light" style={{ borderTopLeftRadius: '20px' }}>
    <div className="px-4">
      {<JobApplicationsTable></JobApplicationsTable>}
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

  console.log('Active View:', activeView);
  
  const contentComponents: Record<ViewType, React.ComponentType> = {
    home: MainHomeContent,
    applications: MyApplicationsContent,
    saved: SavedJobsContent,
  };

  const ActiveContent = contentComponents[activeView] || MainHomeContent;

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