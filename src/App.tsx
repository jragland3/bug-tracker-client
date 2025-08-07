import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ReportBugPage from './pages/ReportBugPage/ReportBugPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/report-bug" element={<ReportBugPage />} />
    </Routes>
  );
}

export default App;
