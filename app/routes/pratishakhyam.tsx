import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";
import NavigationControls from "~/components/NavigationControls";
import {
  getAllPratisakhyaSutras,
  getPratisakhyaSutraByNumber,
} from "~/services/api";
import type { PratisakhyaSutra } from "~/types/sutra";

export default function PratishakhyamPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sutra, setSutra] = useState<PratisakhyaSutra | null>(null);
  const [allSutras, setAllSutras] = useState<PratisakhyaSutra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentNumber = searchParams.get("current") || "1.1";

  useEffect(() => {
    const loadSutras = async () => {
      try {
        setLoading(true);
        setError(null);

        const [sutras, currentSutra] = await Promise.all([
          getAllPratisakhyaSutras(),
          getPratisakhyaSutraByNumber(currentNumber),
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
        console.error("Error loading pratisakhya sutras:", err);
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
            <div className="text-center pt-8 pb-6">
              <h1
                className="font-bold text-black mb-4"
                style={{ fontFamily: "serif", fontSize: "32px" }}
              >
                कृष्ण-यजुर्वेद-तैत्तिरीय-प्रातिशाख्यम्​
              </h1>
              <h2
                className="font-bold text-black mb-8"
                style={{ fontFamily: "serif", fontSize: "28px" }}
              >
                {sutra.chapter_heading}
              </h2>
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

              {sutra.bhashya && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontFamily: "serif", fontSize: "22px" }}
                  dangerouslySetInnerHTML={{
                    __html: sutra.bhashya.replace(
                      /(\d+\.\d+\.\d+|\d+\/\d+|[A-Z])/g,
                      '<span style="font-size: 12px; vertical-align: sub;">$1</span>'
                    )
                  }}
                />
              )}

              {sutra.portuguese_translation && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontSize: "18px" }}
                >
                  {sutra.portuguese_translation}
                </p>
              )}

              {sutra.verse_explanation_pt && (
                <p
                  className="text-black leading-relaxed mb-4"
                  style={{ fontSize: "18px" }}
                >
                  {sutra.verse_explanation_pt}
                </p>
              )}

              {sutra.bhashya_translation_pt && (
                <p
                  className="text-black leading-relaxed mb-6"
                  style={{ fontSize: "18px" }}
                >
                  {sutra.bhashya_translation_pt}
                </p>
              )}

              {sutra.example && (
                <div className="text-center">
                  <p
                    className="text-black leading-relaxed font-semibold"
                    style={{ fontSize: "16px" }}
                  >
                    exemplo
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
