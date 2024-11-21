'use client';

import { useCallback, useState } from 'react';
const useToggle = (initialState = false) => {
  const [isTrue, setIsTrue] = useState(initialState);
  const setTrue = useCallback(() => setIsTrue(true), []);
  const setFalse = useCallback(() => setIsTrue(false), []);
  const toggle = useCallback(() => setIsTrue(!isTrue), [isTrue]);
  return {
    isTrue,
    toggle,
    setTrue,
    setFalse
  };
};
export default useToggle;