import React, { useState } from 'react';
import { JobContent } from './JobContent';
import { Sidebar } from './SideBar';

export const Dashboard = () => {

    const[activeView, setActiveView] = useState('Home');

    const contentComponents = {
        Home: JobContent,
        Myapplications: JobContent,
        Savedjobs: JobContent,
    };

    const ActiveComponent = contentComponents[activeView] || JobContent;

    return (
        <div className="dashboard-container">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />
            <main className="content-area">
                <ActiveComponent />
            </main>
        </div>
    );

}