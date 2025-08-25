import React from 'react';
import { FaTachometerAlt, FaClipboardList, FaRegClock, FaChartBar, FaFileAlt, FaCog } from 'react-icons/fa';
import { Logocard } from './LogoCard';
import { Nav, Button } from 'react-bootstrap';

export function Sidebar({ activeView, onViewChange }) {
  // Navigation options with corresponding views
  const navOptions = [
    { key: 'Home', icon: <FaTachometerAlt />, label: 'Home', view: 'dashboard' },
    { key: 'My Applications', icon: <FaRegClock />, label: 'My Applications', view: 'applications' },
    { key: 'Saved Jobs', icon: <FaFileAlt />, label: 'Saved Jobs', view: 'saved' },
    { key: 'Job Content', icon: <FaClipboardList />, label: 'Job Content', view: 'jobs' }, // Added this to access your JobContent
  ];

  // Handle navigation click
  const handleNavClick = (option) => {
    onViewChange(option.view); // Use the view property to set the active view
  };

  return (
    <aside>
      <nav className="bg-white rounded-0 p-4 d-flex flex-column align-items-center" 
           style={{
             width: 'clamp(260px, 20vw, 300px)', // Responsive width that grows with viewport
             minHeight: 'calc(100vh - 120px)'
           }}>
        
        <div className="w-100 d-flex flex-column gap-4">
          {navOptions.map((opt, idx) => (
            <Button
              key={opt.key}
              onClick={() => handleNavClick(opt)}
              className={`
                w-100 d-flex align-items-center gap-3 border-0 rounded-3
                ${activeView === opt.view ? 'bg-dark text-white px-3 py-2' : 'bg-transparent text-dark p-0'}
                ${idx === 0 ? 'mb-2' : ''}
                transition-all
              `}
            >
              {React.cloneElement(opt.icon, {
                color: activeView === opt.view ? '#FFC107' : '#A3A3A3',
                fontSize: 20,
                style: { marginRight: '16px' },
              })}
              <span className={`${activeView === opt.view ? 'text-white fw-bold' : 'text-dark fw-medium'}`}>
                {opt.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>
    </aside>
  );
}