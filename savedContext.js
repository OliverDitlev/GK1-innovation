import React, { createContext, useContext, useState } from 'react';

const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
}

// Bruges i screens: const { savedIds, toggleSave } = useSaved();
export function useSaved() {
  return useContext(SavedContext);
}
