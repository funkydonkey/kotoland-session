import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { InvitationPage } from './pages/InvitationPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ResultsPage } from './pages/ResultsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
