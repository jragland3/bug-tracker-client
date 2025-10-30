import { render, screen, waitFor } from '@testing-library/react';
import ReportBugPage from '../ReportBugPage/ReportBugPage';
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock bugs to be used in tests
const mockBugs = [
  { id: 1, title: 'Bug 1', description: 'First bug', status: 'open' },
  { id: 2, title: 'Bug 2', description: 'Second bug', status: 'closed' }
]

describe('ReportBugPage', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn((url, options) => {
      if (url?.toString().includes('bugs.getBugs')) {
        return Promise.resolve({
          json: () => Promise.resolve({ result: { data: mockBugs } }),
        } as Response);
      }

      if (url?.toString().includes('bugs.createBug')) {
        return Promise.resolve({
          json: () => Promise.resolve({ id: 3, ...JSON.parse(options?.body as string) }),
        } as Response);
      }

      if (url?.toString().includes('bugs.deleteBug')) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        } as Response);
      }

      return Promise.reject(new Error('Unknown fetch call'));
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });


  // ---------------
  // Tests
  // ---------------
  it('renders bug list', async () => {
    render(
      <MemoryRouter>
        <ReportBugPage />
      </MemoryRouter>
    );

    // Wait for fetchBugs to resolve
    expect(await screen.findByText('Reported Bugs')).toBeInTheDocument();

    // Check that bugs are displayed
    for (const bug of mockBugs) {
      expect(await screen.findByText(bug.title)).toBeInTheDocument();
      expect(await screen.findByText(bug.description)).toBeInTheDocument();
    }
  });
  

  it('submits a new bug', async () => {
    render(<ReportBugPage />);
    const user = userEvent.setup();

    // Fill the form
    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(titleInput, 'NewBug');
    await user.type(descriptionInput, 'Bug description');
    await user.click(submitButton);

    // Wait for fetchBugs to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('bugs.createBug'),
        expect.any(Object),
      );
    });
  });
  

  it('deletes a previously submitted bug', async () => {
    render(<ReportBugPage />);
    const user = userEvent.setup();

    const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('bugs.deleteBug'),
        expect.any(Object),
      );
    });
  });
});