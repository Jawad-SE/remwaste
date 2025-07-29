'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

async function fetchUser(): Promise<User> {
  const { data } = await api.get('/auth/me');
  return data;
}

export function useUser() {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
