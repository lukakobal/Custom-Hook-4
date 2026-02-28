import { useState, useEffect } from "react";
import "./styles.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function App() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      console.log("API call za:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="container">
      <h1>Custom Hook – useDebounce</h1>

      <input
        type="text"
        placeholder="Vpiši iskalni pojem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>🔹 Trenutna vrednost: {search}</p>
      <p>⏳ Debounce vrednost (500ms): {debouncedSearch}</p>
    </div>
  );
}
