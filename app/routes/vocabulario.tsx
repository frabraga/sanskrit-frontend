import { useState, useEffect, useMemo } from "react";
import SanskritLayout from "~/components/SanskritLayout";
import { getAllVocabulary } from "~/services/api";
import type { VocabularyEntry } from "~/types/sutra";

export default function VocabularioPage() {
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(10);
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

  // Client-side search
  const filteredVocabulary = useMemo(() => {
    let filtered = vocabulary;

    // Search across multiple fields
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.word_devanagari?.toLowerCase().includes(term) ||
          entry.itrans?.toLowerCase().includes(term) ||
          entry.iast?.toLowerCase().includes(term) ||
          entry.harvard_kyoto?.toLowerCase().includes(term) ||
          entry.meaning_pt?.toLowerCase().includes(term) ||
          entry.meaning_es?.toLowerCase().includes(term) ||
          entry.meaning_en?.toLowerCase().includes(term)
      );
    }

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

  // Paginate results
  const displayedVocabulary = useMemo(() => {
    return filteredVocabulary.slice(0, resultsPerPage);
  }, [filteredVocabulary, resultsPerPage]);

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
                    {entry.meaning_pt || entry.meaning_es || entry.meaning_en}
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

          {/* Load More Button */}
          {displayedVocabulary.length < filteredVocabulary.length && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setResultsPerPage(resultsPerPage + 10)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Carregar mais (
                {filteredVocabulary.length - displayedVocabulary.length}{" "}
                restantes)
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-center text-sm text-gray-700">
            Mostrando {displayedVocabulary.length} de{" "}
            {filteredVocabulary.length} resultado
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
