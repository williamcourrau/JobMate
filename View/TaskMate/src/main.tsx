import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react';
import { TaskManagement } from './screens/TaskManagement';
import 'bootstrap/dist/css/bootstrap.min.css';


const root  = createRoot(document.getElementById('root')!);

root.render(
  <>
  <StrictMode>
    <TaskManagement />
  </StrictMode>
  </>
);
