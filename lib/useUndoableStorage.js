'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_HISTORY = 30;

/**
 * Like useLocalStorage, but keeps an in-memory history stack so any change
 * can be undone. History is intentionally NOT persisted — it lives only
 * for the current browser session and resets on refresh.
 */
export function useUndoableStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const historyRef = useRef([]);
  const [historyLen, setHistoryLen] = useState(0);
  const [lastChanged, setLastChanged] = useState(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (e) {
      console.warn('useUndoableStorage read error:', e);
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback((value) => {
    setStoredValue((current) => {
      const next = value instanceof Function ? value(current) : value;
      // Push current state onto history before applying the change
      historyRef.current = [...historyRef.current, current].slice(-MAX_HISTORY);
      setHistoryLen(historyRef.current.length);
      setLastChanged(Date.now());
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch (e) {
        console.warn('useUndoableStorage write error:', e);
      }
      return next;
    });
  }, [key]);

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current[historyRef.current.length - 1];
    historyRef.current = historyRef.current.slice(0, -1);
    setHistoryLen(historyRef.current.length);
    setStoredValue(prev);
    try {
      window.localStorage.setItem(key, JSON.stringify(prev));
    } catch (e) {
      console.warn('undo write error:', e);
    }
  }, [key]);

  return {
    data: storedValue,
    setData: setValue,
    hydrated,
    undo,
    canUndo: historyLen > 0,
    lastChanged,
  };
}
