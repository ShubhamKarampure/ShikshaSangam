'use client';

import { useEffect, useState } from 'react';
export default function useLocalStorage(key, initialValue, override = false) {
  const [storedValue, setStoredValue] = useState(() => {
    if (override) return initialValue;
    try {
      let item = null;
      if (key) {
        item = window.localStorage.getItem(key);
      }
      if (!item) localStorage.setItem(key, JSON.stringify(initialValue));
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const getStoredItem = () => {
    if (key) {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  };
  useEffect(() => {
    window.addEventListener('storage', getStoredItem, false);
    return () => window.removeEventListener('storage', getStoredItem);
  }, []);
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (key) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}