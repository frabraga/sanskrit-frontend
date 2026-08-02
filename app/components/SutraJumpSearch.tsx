import { useEffect, useRef, useState } from "react";
import { digitsOnly, normalizeNumber } from "~/utils/devanagariNumerals";

export interface SutraLike {
  number: string;
  sutra_text: string;
}

interface SutraJumpSearchProps<T extends SutraLike> {
  items: T[];
  onSelect: (item: T) => void;
  placeholder?: string;
  className?: string;
}

function getSuggestions<T extends SutraLike>(items: T[], query: string): T[] {
  const q = query.trim();
  if (!q) return [];

  const qNormalized = normalizeNumber(q).toLowerCase();
  const qDigits = digitsOnly(q);

  const numberMatches: T[] = [];
  const textMatches: T[] = [];

  for (const item of items) {
    const itemNormalized = normalizeNumber(item.number).toLowerCase();
    const itemDigits = digitsOnly(item.number);

    const numberHit =
      itemNormalized.includes(qNormalized) ||
      (qDigits.length > 0 && itemDigits.includes(qDigits));

    if (numberHit) {
      numberMatches.push(item);
    } else if (item.sutra_text.includes(q)) {
      textMatches.push(item);
    }
  }

  return [...numberMatches, ...textMatches].slice(0, 8);
}

export default function SutraJumpSearch<T extends SutraLike>({
  items,
  onSelect,
  placeholder = "Buscar por número (ex: 1.2.27)",
  className = "",
}: SutraJumpSearchProps<T>) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = getSuggestions(items, query);

  const selectItem = (item: T) => {
    onSelect(item);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setHighlightedIdx(0);
    setShowSuggestions(val.trim().length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      return;
    }

    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.min(i + 1, suggestions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIdx((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        selectItem(suggestions[highlightedIdx]);
        return;
      }
    }
  };

  return (
    <div ref={searchRef} className={`relative max-w-4xl mx-auto mb-3 px-4 ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query.trim()) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-2 border-blue-400 rounded focus:outline-none focus:border-blue-700 text-gray-800 text-sm md:text-base"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 left-4 right-4 bg-white border-2 border-blue-400 rounded shadow-lg mt-1 max-h-72 overflow-y-auto">
          {suggestions.map((item, i) => (
            <li
              key={item.number}
              onMouseDown={() => selectItem(item)}
              onMouseEnter={() => setHighlightedIdx(i)}
              className={`px-4 py-2 cursor-pointer flex justify-between items-center text-sm md:text-base ${
                i === highlightedIdx ? "bg-blue-100" : "hover:bg-blue-50"
              }`}
            >
              <span
                className="text-gray-800 truncate"
                style={{ fontFamily: "serif" }}
              >
                {item.sutra_text}
              </span>
              <span className="text-gray-400 text-xs ml-2 shrink-0" style={{ fontFamily: "serif" }}>
                {item.number}
              </span>
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && query.trim() && suggestions.length === 0 && (
        <div className="absolute z-50 left-4 right-4 bg-white border-2 border-blue-400 rounded shadow-lg mt-1 px-4 py-3 text-sm text-gray-500">
          Nenhum resultado encontrado.
        </div>
      )}
    </div>
  );
}
