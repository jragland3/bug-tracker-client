/// <reference types="vitest" />

import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';
import { vi } from 'vitest';


test('submits form with title and description', () => {
  const mockSubmit = vi.fn();

  render(<BugForm onSubmit={mockSubmit} />);

  // Finds input with the placeholder "Title" - case-insensitive using `/title/i`
  fireEvent.change(screen.getByPlaceholderText(/title/i), {
    target: { value: 'Bug title' },
  });

  // Finds input with the placeholder "Description" - case-insensitive using `/description/i`
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: 'Bug description' }
  });

  fireEvent.click(screen.getByRole('button', { name: /submit/i  }));

  expect(mockSubmit).toHaveBeenCalledWith({
    title: 'Bug title',
    description: 'Bug description',
  });
});
