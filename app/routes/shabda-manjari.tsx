import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";
import NavigationControls from "~/components/NavigationControls";
import AudioPlayer from "~/components/AudioPlayer";
import { getAllShabdas, getShabdaByIndex } from "~/services/api";
import type { Shabda } from "~/types/sutra";

export default function ShabdaManjariPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shabda, setShabda] = useState<Shabda | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = parseInt(searchParams.get("current") || "1");

  useEffect(() => {
    const loadShabda = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allShabdas, currentShabda] = await Promise.all([
          getAllShabdas(),
          getShabdaByIndex(currentIndex),
        ]);

        setTotalCount(allShabdas.length);

        if (!currentShabda && allShabdas.length > 0) {
          // Se não encontrou o índice, pega o primeiro
          setShabda(allShabdas[0]);
          setSearchParams({ current: allShabdas[0].order_index.toString() });
        } else {
          setShabda(currentShabda);
        }
      } catch (err) {
        console.error("Error loading shabda:", err);
        setError("Erro ao carregar shabda");
      } finally {
        setLoading(false);
      }
    };

    loadShabda();
  }, [currentIndex, setSearchParams]);

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
