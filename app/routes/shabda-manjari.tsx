import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";
import NavigationControls from "~/components/NavigationControls";
import AudioPlayer from "~/components/AudioPlayer";
import { getAllShabdas } from "~/services/api";
import type { Shabda } from "~/types/sutra";

// Extracts the Portuguese/transliterated term from parentheses at end of title
// e.g. "अकारान्तः पुंलिङ्गः 'राम' शब्दः (Rāma)" → "Rāma"
function extractPortuguese(title: string): string {
  const match = title.match(/\(([^)]+)\)\s*$/);
  return match ? match[1] : "";
}

function getSuggestions(shabdas: Shabda[], query: string): Shabda[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return shabdas
    .filter((s) => {
      const pt = extractPortuguese(s.title).toLowerCase();
      return (
        pt.includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);
}

export default function ShabdaManjariPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shabdas, setShabdas] = useState<Shabda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  // `current` is a 1-based position in the sorted list, not an order_index value
  const currentIndex = Math.max(1, parseInt(searchParams.get("current") || "1"));

  useEffect(() => {
    const loadShabdas = async () => {
      try {
        setLoading(true);
        setError(null);
        const all = await getAllShabdas();
        setShabdas(all);
      } catch (err) {
        console.error("Error loading shabda:", err);
        setError("Erro ao carregar shabda");
      } finally {
        setLoading(false);
      }
    };

    loadShabdas();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalCount = shabdas.length;
  const shabda = shabdas[currentIndex - 1] ?? null;

  const navigateTo = (position: number) => {
    setSearchParams({ current: position.toString() });
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setHighlightedIdx(0);
    setShowSuggestions(val.trim().length > 0 && !/^\d+$/.test(val.trim()));
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestions = getSuggestions(shabdas, query);

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
        const position = shabdas.indexOf(suggestions[highlightedIdx]) + 1;
        navigateTo(position);
        return;
      }
    }

    // Number jump on Enter
    if (e.key === "Enter") {
      const num = parseInt(query.trim(), 10);
      if (!isNaN(num) && num >= 1 && num <= totalCount) {
        navigateTo(num);
      }
    }
  };

  const suggestions = getSuggestions(shabdas, query);

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setSearchParams({ current: (currentIndex - 1).toString() });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCount) {
      setSearchParams({ current: (currentIndex + 1).toString() });
    }
  };

  if (loading) {
    return (
      <SanskritLayout>
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Carregando...</h2>
        </div>
      </SanskritLayout>
    );
  }

  if (error || !shabda) {
    return (
      <SanskritLayout>
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {error || "Nenhum shabda encontrado"}
          </h2>
        </div>
      </SanskritLayout>
    );
  }
  return (
    <SanskritLayout>
      <div className="p-2 md:p-4">
        <div className="container mx-auto">
          {/* Search box */}
          <div ref={searchRef} className="relative max-w-6xl mx-auto mb-3 px-4">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => {
                if (query.trim() && !/^\d+$/.test(query.trim()))
                  setShowSuggestions(true);
              }}
              placeholder="Buscar por nome (ex: Vaca) ou número (ex: 12)"
              className="w-full px-4 py-2 border-2 border-blue-400 rounded focus:outline-none focus:border-blue-700 text-gray-800 text-sm md:text-base"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 left-4 right-4 bg-white border-2 border-blue-400 rounded shadow-lg mt-1 max-h-72 overflow-y-auto">
                {suggestions.map((s, i) => {
                  const pt = extractPortuguese(s.title);
                  const position = shabdas.indexOf(s) + 1;
                  return (
                    <li
                      key={s.id}
                      onMouseDown={() => navigateTo(position)}
                      onMouseEnter={() => setHighlightedIdx(i)}
                      className={`px-4 py-2 cursor-pointer flex justify-between items-center text-sm md:text-base ${
                        i === highlightedIdx ? "bg-blue-100" : "hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-gray-800 truncate">
                        {pt ? (
                          <>
                            <span className="font-semibold">{pt}</span>
                            <span className="text-gray-500 ml-2 text-xs hidden md:inline">
                              {s.category}
                            </span>
                          </>
                        ) : (
                          s.title
                        )}
                      </span>
                      <span className="text-gray-400 text-xs ml-2 shrink-0">#{position}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {showSuggestions && query.trim() && suggestions.length === 0 && (
              <div className="absolute z-50 left-4 right-4 bg-white border-2 border-blue-400 rounded shadow-lg mt-1 px-4 py-3 text-sm text-gray-500">
                Nenhum resultado encontrado.
              </div>
            )}
          </div>

          {/* Navigation outside the blue border */}
          <NavigationControls
            currentIndex={currentIndex}
            totalCount={totalCount}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemType="Shabda"
            className="max-w-6xl"
          />

          {/* Main Content Container with Blue Border */}
          <div className="max-w-6xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            {/* Content Section */}
            <div className="px-2 md:px-8 pb-8 md:pb-16">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 mt-4 md:mt-8"
                  style={{ fontFamily: "serif" }}
                >
                  {shabda.category}
                </h2>
                <h3
                  className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4 md:mb-6"
                  style={{ fontFamily: "serif" }}
                >
                  {shabda.prakarana_label}
                </h3>
                <h4
                  className="text-lg md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6"
                  style={{ fontFamily: "serif" }}
                >
                  {shabda.title}
                </h4>
              </div>

              {/* Declension Table */}
              <div className="w-full">
                <table className="w-full border-collapse border-2 border-blue-700 table-fixed">
                  {/* Table Header */}
                  <thead>
                    <tr>
                      <th className="border-2 border-blue-700 bg-blue-600 text-white p-1 md:p-4 text-sm md:text-2xl font-bold w-1/6"></th>
                      <th className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-sm md:text-2xl font-bold w-1/4">
                        S
                      </th>
                      <th className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-sm md:text-2xl font-bold w-1/4">
                        D
                      </th>
                      <th className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-sm md:text-2xl font-bold w-1/4">
                        P
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shabda.declensions.map((declension, index) => (
                      <tr key={declension.id}>
                        <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                          {declension.case_label}
                        </td>
                        <td
                          className={`border-2 border-blue-700 text-black p-1 md:p-4 text-center text-base md:text-2xl ${
                            index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
                          }`}
                          style={{ fontFamily: "serif" }}
                        >
                          {declension.singular}
                        </td>
                        <td
                          className={`border-2 border-blue-700 text-black p-1 md:p-4 text-center text-base md:text-2xl ${
                            index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
                          }`}
                          style={{ fontFamily: "serif" }}
                        >
                          {declension.dual}
                        </td>
                        <td
                          className={`border-2 border-blue-700 text-black p-1 md:p-4 text-center text-base md:text-2xl ${
                            index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"
                          }`}
                          style={{ fontFamily: "serif" }}
                        >
                          {declension.plural}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Audio Player Below Table */}
              {shabda.audio && (
                <div className="mt-6 md:mt-8 mb-4">
                  <AudioPlayer
                    audio={shabda.audio}
                    className="max-w-2xl mx-auto"
                  />
                </div>
              )}

              {/* Commentary */}
              {shabda.commentary && (
                <div className="mt-6 md:mt-8 max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded p-4 md:p-6">
                  <p
                    className="text-base md:text-xl text-gray-800 leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "serif" }}
                  >
                    {shabda.commentary}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-3 left-0 right-0 text-center px-4">
              <p className="text-sm text-gray-700 font-medium">
                Dr. José Salazar – Programa Tradicional de Sânscrito – Dúvidas e
                colaboração: jose.vedanta@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </SanskritLayout>
  );
}
