import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";
import { getAllSutras, getSutraByNumber } from "~/services/api";
import type { Sutra } from "~/types/sutra";

export default function SutrasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sutra, setSutra] = useState<Sutra | null>(null);
  const [allSutras, setAllSutras] = useState<Sutra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentNumber = searchParams.get("current") || "1.1.1";

  useEffect(() => {
    const loadSutras = async () => {
      try {
        setLoading(true);
        setError(null);

        const [sutras, currentSutra] = await Promise.all([
          getAllSutras(),
          getSutraByNumber(currentNumber),
        ]);

        setAllSutras(sutras);

        if (!currentSutra && sutras.length > 0) {
          // If current sutra not found, load the first one
          setSutra(sutras[0]);
          setSearchParams({ current: sutras[0].number });
        } else {
          setSutra(currentSutra);
        }
      } catch (err) {
        console.error("Error loading sutras:", err);
        setError("Erro ao carregar sutras");
      } finally {
        setLoading(false);
      }
    };

    loadSutras();
  }, [currentNumber, setSearchParams]);

  const getCurrentIndex = () => {
    if (!sutra || allSutras.length === 0) return 0;
    return allSutras.findIndex((s) => s.number === sutra.number) + 1;
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 1) {
      const prevSutra = allSutras[currentIndex - 2];
      setSearchParams({ current: prevSutra.number });
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < allSutras.length) {
      const nextSutra = allSutras[currentIndex];
      setSearchParams({ current: nextSutra.number });
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

  if (error || !sutra) {
    return (
      <SanskritLayout>
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {error || "Nenhum sutra encontrado"}
          </h2>
        </div>
      </SanskritLayout>
    );
  }

  const currentIndex = getCurrentIndex();

  return (
    <SanskritLayout>
      <div className="p-2 md:p-4">
        <div className="container mx-auto">
          {/* Main Content Container with Blue Border */}
          <div className="max-w-4xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            {/* Header with Lamp Image */}
            <div className="text-center pt-8 pb-6">
              <div className="mb-4">
                <img
                  src="/images/lamp.png"
                  alt="Lamp"
                  className="w-16 h-20 md:w-20 md:h-24 mx-auto mb-2"
                />
              </div>
              <h1
                className="text-4xl md:text-6xl font-bold text-black mb-4"
                style={{ fontFamily: "serif" }}
              >
                अष्टाध्यायी
              </h1>
              <h2
                className="text-2xl md:text-4xl font-bold text-black mb-8"
                style={{ fontFamily: "serif" }}
              >
                अथ प्रथमोऽध्यायः
              </h2>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mb-6 px-4 md:px-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex <= 1}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium"
              >
                ← Anterior
              </button>

              <div className="text-center">
                <span className="text-sm md:text-base text-gray-600 font-medium">
                  Sutra {currentIndex} de {allSutras.length}
                </span>
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex >= allSutras.length}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium"
              >
                Próximo →
              </button>
            </div>

            {/* Content Section */}
            <div className="px-4 md:px-12 pb-16">
              {/* Sutra Number */}
              <div className="text-center mb-6">
                <h3
                  className="font-bold text-black"
                  style={{ fontFamily: "serif", fontSize: "28px" }}
                >
                  {sutra.number} {sutra.sanskrit_text}
                </h3>
              </div>

              {/* Sanskrit Explanation */}
              <div className="text-center mb-8">
                <p
                  className="text-black leading-relaxed"
                  style={{ fontFamily: "serif", fontSize: "24px" }}
                >
                  {sutra.sanskrit_explanation}
                </p>
              </div>

              {/* Portuguese Translation */}
              <div className="text-center">
                <p className="text-black leading-relaxed font-medium" style={{ fontSize: "20px" }}>
                  {sutra.portuguese_translation}
                </p>
              </div>
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
