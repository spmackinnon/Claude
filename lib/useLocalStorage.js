'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn('useLocalStorage read error:', error);
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('useLocalStorage write error:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue, hydrated];
}
