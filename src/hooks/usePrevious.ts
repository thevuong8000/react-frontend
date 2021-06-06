import { useEffect, useRef } from 'react';

const usePrevious = <T = any>(value: T) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
