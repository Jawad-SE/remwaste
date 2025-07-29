'use client';

import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export function useRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = Cookies.get('role');
    setRole(storedRole ?? null);
  }, []);

  return role;
}
