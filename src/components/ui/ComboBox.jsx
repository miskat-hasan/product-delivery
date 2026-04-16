import { useEffect, useRef, useState } from "react";

const AirportComboBox = ({
  airports = [],
  mode = "short",
  value,
  onChange,
  className,
  placeholder,
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);

  const formatDisplay = (fullString) => {
    if (!fullString) return "";

    if (mode === "prefix") {
      return fullString.split("/")[0];
    }

    return fullString.replace(/\(.*?\)$/, "").trim();
  };

  useEffect(() => {
    setQuery(formatDisplay(value));
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? airports.filter((a) =>
        a.toLowerCase().includes(query.toLowerCase())
      )
    : airports.slice(0, 50);

  const handleSelect = (airport) => {
    setQuery(formatDisplay(airport));
    onChange(airport);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filtered[highlighted]) {
        handleSelect(filtered[highlighted]);
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        className={className}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setHighlighted(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 min-w-[250px] w-full max-h-56 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg text-sm">
          {filtered.map((airport, i) => (
            <li
              key={airport}
              className={`px-3 py-2 cursor-pointer ${
                i === highlighted
                  ? "bg-blue-50 text-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onMouseDown={() => handleSelect(airport)}
              onMouseEnter={() => setHighlighted(i)}
            >
              {airport}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportComboBox;