'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * Floating toast that appears after any data change.
 * Dismisses automatically after 5 seconds or immediately on undo.
 * Also wires up Ctrl/Cmd+Z keyboard shortcut (skipped when a text field is focused).
 */
export default function UndoToast({ lastChanged, canUndo, onUndo }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  // Show toast on every change, reset the auto-dismiss timer
  useEffect(() => {
    if (!lastChanged) return;
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timerRef.current);
  }, [lastChanged]);

  // Keyboard shortcut: Ctrl/Cmd+Z — only when not inside a text input
  useEffect(() => {
    const handler = (e) => {
      if (!(e.metaKey || e.ctrlKey) || e.key !== 'z' || e.shiftKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return; // let browser handle native text undo
      e.preventDefault();
      if (canUndo) {
        onUndo();
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [canUndo, onUndo]);

  const handleUndo = () => {
    onUndo();
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  if (!visible || !canUndo) return null;

  return (
    <div
      className="fixed z-40 left-1/2 -translate-x-1/2 bottom-24 md:bottom-6"
      style={{ animation: 'toastIn 0.2s ease' }}
    >
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-3 bg-stone-800 text-white rounded-full pl-4 pr-2 py-2.5 shadow-xl">
        <span className="text-sm text-stone-300">Change saved</span>
        <div className="w-px h-4 bg-stone-600 flex-shrink-0" />
        <button
          onClick={handleUndo}
          className="text-sm font-semibold text-white hover:text-sage-300 transition-colors px-2 py-0.5 rounded-full hover:bg-stone-700"
        >
          Undo
        </button>
        <button
          onClick={() => { clearTimeout(timerRef.current); setVisible(false); }}
          className="text-stone-500 hover:text-stone-300 transition-colors p-1 ml-0.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
