import { render, screen } from '@testing-library/react';
import Navbar from '../components/NavBar'; // Use correct casing!
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock next/navigation for router usage in UserMenu if needed
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// You might want to mock useUser if it's hitting real API!
jest.mock('@/hooks/useUser', () => ({
  useUser: () => ({ data: { firstName: 'Test', lastName: 'User', role: 'admin' }, isLoading: false }),
}));

const queryClient = new QueryClient();

describe('Navbar', () => {
  it('renders default title and user menu', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Navbar />
      </QueryClientProvider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    // Optionally check for user initials or menu
    expect(screen.getByText(/T[U]?/i)).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Navbar title="Custom Title" />
      </QueryClientProvider>
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
