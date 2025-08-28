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
        <div className="d-flex">
            <Sidebar activeView={activeView} onViewChange={setActiveView} />
                <div className="flex-grow-1 p-3">
                    <ActiveComponent />
                </div>
        </div>
    );

}