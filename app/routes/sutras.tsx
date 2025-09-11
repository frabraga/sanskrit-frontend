import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";
import NavigationControls from "~/components/NavigationControls";
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
          {/* Navigation outside the blue border */}
          <NavigationControls
            currentIndex={currentIndex}
            totalCount={allSutras.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemType="Sutra"
          />

          {/* Main Content Container with Blue Border */}
          <div className="max-w-4xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            {/* Header */}
            <div className="text-center pt-6 pb-4">
              <h1
                className="font-bold text-black mb-2"
                style={{ fontFamily: "serif", fontSize: "32px" }}
              >
                अष्टाध्यायी
              </h1>
              <h2
                className="font-semibold text-black mb-2"
                style={{ fontFamily: "serif", fontSize: "28px" }}
              >
                {sutra.chapter_heading}
              </h2>
              <h3
                className="font-semibold text-black mb-6"
                style={{ fontFamily: "serif", fontSize: "24px" }}
              >
                {sutra.pada_heading}
              </h3>
            </div>

            {/* Content Section */}
            <div className="px-4 md:px-12 pb-16 text-center">
              <p
                className="font-bold text-black mb-4"
                style={{ fontFamily: "serif", fontSize: "26px" }}
              >
                {sutra.number}
              </p>
              <h3
                className="font-bold text-black mb-6"
                style={{ fontFamily: "serif", fontSize: "40px" }}
              >
                {sutra.sutra_text}
              </h3>

              {sutra.padaccheda && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontFamily: "serif", fontSize: "22px" }}
                >
                  {sutra.padaccheda}
                </p>
              )}

              {sutra.anuvrtti && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontFamily: "serif", fontSize: "22px" }}
                >
                  {sutra.anuvrtti}
                </p>
              )}

              {sutra.vrtti && (
                <p
                  className="text-black leading-relaxed mb-6"
                  style={{ fontFamily: "serif", fontSize: "22px" }}
                >
                  {sutra.vrtti}
                </p>
              )}

              {sutra.sanskrit_explanation && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontFamily: "serif", fontSize: "22px" }}
                >
                  {sutra.sanskrit_explanation}
                </p>
              )}

              <p
                className="text-black leading-relaxed font-medium mb-6"
                style={{ fontSize: "18px" }}
              >
                {sutra.portuguese_translation}
              </p>

              {sutra.example && (
                <div className="text-center">
                  <p
                    className="text-black leading-relaxed font-semibold"
                    style={{ fontSize: "16px" }}
                  >
                    Exemplo
                  </p>
                  <p
                    className="text-black leading-relaxed"
                    style={{ fontSize: "16px" }}
                  >
                    {sutra.example}
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
