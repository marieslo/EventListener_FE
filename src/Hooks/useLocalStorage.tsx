import { useState } from 'react';

interface LocalStorageValue<T> {
  value: T;
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item).value : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify({ value: valueToStore }));
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
