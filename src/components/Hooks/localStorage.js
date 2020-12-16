import { useState, useEffect } from "react";

const PREFIX = "chattel-editor-";

export default function LocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonvalue = localStorage.getItem(prefixedKey);
    if (jsonvalue !== null) return JSON.parse(jsonvalue);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
