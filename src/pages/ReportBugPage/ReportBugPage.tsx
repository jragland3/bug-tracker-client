import React from 'react';
import BugForm from '../../components/BugForm/BugForm';
import './ReportBugPage.css';

// Define the shape of a bug item
interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
}

const ReportBugPage: React.FC = () => {
  // Store the list of bugs retrieved from the API
  const [bugs, setBugs] = React.useState<Bug[]>([]);

  // Fetch all bugs from the backend API
  const fetchBugs = async() => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bugs.getBugs`);
      const data = await res.json();
      setBugs(data?.result?.data ?? []); // Update state with fetched bugs
    } catch (err) {
      console.error('Failed to fetch bugs:', err);
    }
  };

  // Handle form submission by posting a new bug
  const handleNewBug = async(bug: { title: string; description: string }) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/bugs.createBug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bug, status: 'open' }),
      });

      fetchBugs(); // Refresh the bug list after submitting
    } catch (err) {
      console.error('Failed to submit bug:', err);
    }
  };

  // Handle bug deletion
  const handleDelete = async(id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bugs.deleteBug`, {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Delete failed: ${res.status} ${res.statusText} - ${text}`);
      }

      const json = await res.json();
      console.log('Delete response:', json);
      
      fetchBugs(); // Refresh the bug list after deletion
    } catch (err) {
      console.error('Failed to delete bug:', err);
    }
  };

  // Load bugs when the page first mounts
  React.useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="report-bug-page">
      {/* Render the bug submission form */}
      <BugForm onSubmit={handleNewBug} />

      {/* Display the list of reported bugs */}
      <h2>Reported Bugs</h2>
      <ul>
        {bugs.map((bug) => (
          <li key={bug.id}>
            <strong>{bug.title}</strong> - {bug.status}
            <p>{bug.description}</p>
            <button onClick={() => handleDelete(bug.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportBugPage;
