import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import { TooltipComponent } from 'react-tooltip';
import TaskManagement from './components/TaskManagement';

const App = () => {
  return (
    <>
    <TaskManagement/>
    </>
  );
}

export default App;