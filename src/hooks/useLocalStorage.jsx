import { useState } from "react";
import { getItem, setItem, removeItem} from "../lib/localStorage";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = getItem(key);
    return storedValue !== undefined ? storedValue : initialValue;
  });

  const handleDispatch = (newValue) => {
    setValue((prev) => {
      const finalValue =
        typeof newValue === "function" ? newValue(prev) : newValue;

      if (finalValue === null) {
        removeItem(key);
      } else {
        setItem(key, finalValue);
      }

      return finalValue;
    });
  };

  const clearState = () => {
    setValue(null);
    removeItem(key);
  };

  return [value, handleDispatch, clearState];
}
