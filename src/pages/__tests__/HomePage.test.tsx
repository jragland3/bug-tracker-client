import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';

test('renders HomePage with link to report-bug', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to the Bug Tracker/)).toBeInTheDocument();
  expect(screen.getByText(/This is the home page of your application./)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /report a bug/i })).toHaveAttribute('href', '/report-bug');
});

