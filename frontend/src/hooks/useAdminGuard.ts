'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export function useAdminGuard() {
  const role = Cookies.get('role');

  useEffect(() => {
    if (role !== 'admin') {
      redirect('/patients');
    }
  }, [role]);

  return role;
}
