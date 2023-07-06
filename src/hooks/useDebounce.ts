import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
