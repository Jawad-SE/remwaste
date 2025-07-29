import { renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import { useRole } from '../../hooks/useRole';

jest.mock('js-cookie');

describe('useRole', () => {
  it('returns stored role', () => {
    (Cookies.get as jest.Mock).mockReturnValue('admin');
    const { result } = renderHook(() => useRole());
    expect(result.current).toBe('admin');
  });

  it('returns null if no role', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);
    const { result } = renderHook(() => useRole());
    expect(result.current).toBeNull();
  });
});
