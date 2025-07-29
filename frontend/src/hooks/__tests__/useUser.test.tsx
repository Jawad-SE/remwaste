import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from '../../hooks/useUser';
import { api } from '@/lib/api';

jest.mock('@/lib/api');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useUser', () => {
  it('fetches current user', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 1, firstName: 'User', role: 'admin' } });
    const { result } = renderHook(() => useUser(), { wrapper });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data?.firstName).toBe('User');
    expect(result.current.data?.role).toBe('admin');
  });

  it('handles error', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('error'));
    const { result } = renderHook(() => useUser(), { wrapper });
    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
