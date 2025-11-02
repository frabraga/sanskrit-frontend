import { useState, useEffect, useMemo } from "react";
import SanskritLayout from "~/components/SanskritLayout";
import { getAllVocabulary } from "~/services/api";
import type { VocabularyEntry } from "~/types/sutra";
import { compareSanskrit, getVocabularySortKey } from "~/utils/sanskritSort";

export default function VocabularioPage() {
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"pt" | "en" | "es">(
    "pt"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVocabulary = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllVocabulary();
        setVocabulary(data);
      } catch (err) {
        console.error("Error loading vocabulary:", err);
        setError("Erro ao carregar vocabulário");
      } finally {
        setLoading(false);
      }
    };

    loadVocabulary();
  }, []);

  // Client-side search and sort
  const filteredVocabulary = useMemo(() => {
    let filtered = vocabulary;

    // Search across multiple fields
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          // Main word fields
          entry.word_devanagari?.toLowerCase().includes(term) ||
          entry.root_devanagari?.toLowerCase().includes(term) ||
          // Transliteration fields
          entry.itrans?.toLowerCase().includes(term) ||
          entry.iast?.toLowerCase().includes(term) ||
          entry.harvard_kyoto?.toLowerCase().includes(term) ||
          // Translation fields
          entry.meaning_pt?.toLowerCase().includes(term) ||
          entry.meaning_es?.toLowerCase().includes(term) ||
          entry.meaning_en?.toLowerCase().includes(term) ||
          // Verb declension fields
          entry.standard_form?.toLowerCase().includes(term) ||
          entry.past_imperfect?.toLowerCase().includes(term) ||
          entry.potential?.toLowerCase().includes(term) ||
          entry.imperative?.toLowerCase().includes(term) ||
          entry.past_participle?.toLowerCase().includes(term) ||
          entry.gerund?.toLowerCase().includes(term) ||
          entry.infinitive?.toLowerCase().includes(term) ||
          entry.ppp?.toLowerCase().includes(term)
      );
    }

    // Sort by Sanskrit alphabetical order
    // For verbs, sort by root; for other words, sort by the main word
    filtered = [...filtered].sort((a, b) => {
      const aKey = getVocabularySortKey(a);
      const bKey = getVocabularySortKey(b);
      return compareSanskrit(aKey, bKey);
    });

    return filtered;
  }, [vocabulary, searchTerm]);

  const getGenderLabel = (gender?: string): string => {
    if (!gender) return "";
    const labels = {
      masculine: "m.",
      feminine: "f.",
      neuter: "n.",
    };
    return labels[gender as keyof typeof labels] || gender;
  };

  const getVoiceLabel = (voice?: string): string => {
    if (!voice) return "";
    const labels = {
      parasmaipada: "P",
      atmanepada: "A",
      ubhayapada: "U",
    };
    return labels[voice as keyof typeof labels] || voice;
  };

  // Get translation based on selected language
  const getTranslation = (entry: VocabularyEntry): string => {
    if (selectedLanguage === "pt") {
      return entry.meaning_pt || entry.meaning_en || entry.meaning_es || "";
    } else if (selectedLanguage === "en") {
      return entry.meaning_en || entry.meaning_pt || entry.meaning_es || "";
    } else {
      return entry.meaning_es || entry.meaning_pt || entry.meaning_en || "";
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredVocabulary.length / resultsPerPage);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Paginate results
  const displayedVocabulary = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return filteredVocabulary.slice(startIndex, endIndex);
  }, [filteredVocabulary, resultsPerPage, currentPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(maxVisible, totalPages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxVisible + 1);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
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

  if (error) {
    return (
      <SanskritLayout>
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{error}</h2>
        </div>
      </SanskritLayout>
    );
  }

  return (
    <SanskritLayout>
      <div className="p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center"
              style={{ fontFamily: "serif" }}
            >
              शब्दकोशः
            </h1>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
              {/* Language Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm font-medium"></span>
                <div className="flex gap-1 bg-gray-100 rounded-md p-1">
                  <button
                    onClick={() => setSelectedLanguage("pt")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedLanguage === "pt"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    PT
                  </button>
                  <button
                    onClick={() => setSelectedLanguage("en")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedLanguage === "en"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setSelectedLanguage("es")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedLanguage === "es"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              {/* Results per page */}
              <div className="flex items-center gap-2">
                <select
                  value={resultsPerPage}
                  onChange={(e) => setResultsPerPage(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-gray-700">resultados por página</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="text-center mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite para buscar..."
                className="w-full max-w-md mx-auto px-4 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
            </div>
          </div>

          {/* Vocabulary List - Compact Design */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {displayedVocabulary.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } ${
                  index !== displayedVocabulary.length - 1
                    ? "border-b border-gray-200"
                    : ""
                } hover:bg-gray-100 transition-colors`}
              >
                {/* Main Row */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  {/* Main headword: verbs show root first, fallback to word */}
                  <span
                    className="text-2xl font-bold text-black"
                    style={{ fontFamily: "serif" }}
                  >
                    {entry.word_type === "verb"
                      ? entry.root_devanagari || entry.word_devanagari
                      : entry.word_devanagari}
                  </span>

                  {/* Type Badge for Substantives (noun/adjective/pronoun) */}
                  {entry.word_type === "substantive" && (
                    <span className="text-base font-italic text-red-600">
                      {entry.word_subtype === "adjective"
                        ? "adj."
                        : entry.word_subtype === "pronoun"
                          ? "pron."
                          : getGenderLabel(entry.gender)}
                    </span>
                  )}
                  {entry.word_type === "verb" && entry.verb_class && (
                    <span className="text-base font-italic text-red-600">
                      {entry.verb_class}
                      {getVoiceLabel(entry.voice)}
                    </span>
                  )}
                  {entry.word_type === "indeclinable" && (
                    <span className="text-base font-italic text-red-600">
                      ind.
                    </span>
                  )}

                  {/* Translation */}
                  <span className="text-base text-black">
                    {getTranslation(entry)}
                  </span>
                </div>

                {/* Verb Forms - No Background */}
                {entry.word_type === "verb" && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-base text-gray-600">
                      {entry.standard_form && (
                        <span className="text-lg text-gray-700">
                          pres.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900 text-lg"
                          >
                            {entry.standard_form}
                          </span>
                        </span>
                      )}
                      {entry.past_participle && (
                        <span>
                          • p.per.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.past_participle}
                          </span>
                        </span>
                      )}
                      {entry.ppp && (
                        <span>
                          • ppra.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.ppp}
                          </span>
                        </span>
                      )}
                      {entry.past_participle && (
                        <span>
                          • ppp.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.past_participle}
                          </span>
                        </span>
                      )}
                      {entry.gerund && (
                        <span>
                          • ger.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.gerund}
                          </span>
                        </span>
                      )}
                      {entry.infinitive && (
                        <span>
                          • inf.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.infinitive}
                          </span>
                        </span>
                      )}
                      {entry.imperative && (
                        <span>
                          • imp.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.imperative}
                          </span>
                        </span>
                      )}
                      {entry.past_imperfect && (
                        <span>
                          • p.imp.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.past_imperfect}
                          </span>
                        </span>
                      )}
                      {entry.potential && (
                        <span>
                          • pot.{" "}
                          <span
                            style={{ fontFamily: "serif" }}
                            className="text-gray-900"
                          >
                            {entry.potential}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredVocabulary.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-lg text-gray-900">
                Nenhum resultado encontrado
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Tente uma busca diferente
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`min-w-[40px] px-3 py-2 rounded-md transition-colors ${
                    page === currentPage
                      ? "bg-blue-600 text-white font-bold border-2 border-blue-700"
                      : page === "..."
                        ? "cursor-default text-gray-500"
                        : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima página"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-center text-sm text-gray-700">
            Mostrando{" "}
            {displayedVocabulary.length > 0
              ? (currentPage - 1) * resultsPerPage + 1
              : 0}{" "}
            de {filteredVocabulary.length} resultado
            {filteredVocabulary.length !== 1 ? "s" : ""}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center px-4">
            <p className="text-xs text-gray-700">
              Dr. José Salazar – Programa Tradicional de Sânscrito – Dúvidas e
              colaboração: jose.vedanta@gmail.com
            </p>
          </div>
        </div>
      </div>
    </SanskritLayout>
  );
}
