import { useEffect, useState } from 'react'
import BugForm from './components/BugForm'


interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
}

function App() {
  const [bugs, setBugs] = useState<Bug[]>([]);

  const fetchBugs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/bugs`);
    const data = await res.json();
    setBugs(data);
  };

  const handleNewBug = async (bug: { title: string; description: string }) => {
    await fetch(`${import.meta.env.VITE_API_URL}/bugs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bug, status: 'open' }),
    })
    fetchBugs();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/bugs/${id}`, {
      method: 'DELETE',
    });
    fetchBugs();
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <BugForm onSubmit={handleNewBug} />

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
  )
}

export default App
