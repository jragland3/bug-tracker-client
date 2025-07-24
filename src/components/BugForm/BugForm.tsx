import { useState } from 'react';

interface BugFormProps {
  onSubmit: (bug: { title: string; description: string }) => void;
}

// Bug form with a title and description field that can be submitted
export default function BugForm({ onSubmit }: BugFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a Bug</h2>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea 
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}
