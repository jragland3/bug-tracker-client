import { Routes, Route } from 'react-router-dom';
import ReportBugPage from './pages/ReportBugPage/ReportBugPage';

function App() {
  return (
    <Routes>
      <Route path="/report-bug" element={<ReportBugPage />} />
    </Routes>
  )
}

export default App
