import { Link } from "react-router";
import SanskritLayout from "~/components/SanskritLayout";

export function meta() {
  return [
    { title: "Programa Tradicional de Sânscrito - प्रार्थना" },
    {
      name: "description",
      content:
        "Programa Tradicional de Sânscrito - Dúvidas e colaboração: jose.vedanta@gmail.com",
    },
  ];
}

export default function Home() {
  return (
    <SanskritLayout>
      <div className="p-2 md:p-4">
        <div className="container mx-auto">
          {/* Main Content Container with Blue Border */}
          <div className="max-w-7xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            {/* Decorative Images - Hidden on mobile, visible on desktop */}
            {/* Left - Man Praying */}
            <img
              src="/images/man_praying.png"
              alt="Homem orando"
              className="hidden md:block absolute top-6 left-6 w-32 lg:w-64 h-32 lg:h-64 object-contain z-10"
            />

            {/* Right - Hanuman */}
            <img
              src="/images/hanumam.png"
              alt="Hanuman"
              className="hidden md:block absolute top-6 right-6 w-32 lg:w-64 h-32 lg:h-64 object-contain z-10"
            />

            {/* Header with Sacred Symbol - Lamparina */}
            <div className="text-center pt-8 md:pt-20 pb-6">
              <div className="mb-4">
                <img
                  src="/images/lamp.png"
                  alt="Lamparina tradicional"
                  className="mx-auto w-16 h-16 md:w-24 md:h-24 object-contain"
                />
              </div>
              <h1
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 tracking-wide"
                style={{ fontFamily: "serif" }}
              >
                प्रार्थना
              </h1>
            </div>

            {/* Central Prayer Text */}
            <div className="text-center px-4 md:px-12 mb-8 md:mb-16">
              <div className="max-w-5xl mx-auto space-y-2 md:space-y-3 text-lg md:text-3xl leading-relaxed">
                <p
                  className="text-gray-900 font-semibold"
                  style={{ fontFamily: "serif" }}
                >
                  सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।
                </p>
                <p
                  className="text-gray-900 font-semibold"
                  style={{ fontFamily: "serif" }}
                >
                  विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥
                </p>
                <p
                  className="text-gray-900 font-semibold mt-4"
                  style={{ fontFamily: "serif" }}
                >
                  वेनाक्षर-समाम्नायम् अक्षिगम्य महेश्वरात् ।
                </p>
                <p
                  className="text-gray-900 font-semibold"
                  style={{ fontFamily: "serif" }}
                >
                  कृत्स्नं व्याकरणं प्रोक्तं तस्मै पाणिनये नमः ॥
                </p>
                <p
                  className="text-gray-900 font-semibold mt-4"
                  style={{ fontFamily: "serif" }}
                >
                  वाक्यकारं वरेन्येषु भाष्यकारं पतञ्जलिम् ।
                </p>
                <p
                  className="text-gray-900 font-semibold"
                  style={{ fontFamily: "serif" }}
                >
                  पाणिनिं सूत्रकारं च प्रणतोऽस्मि मुनित्रयम् ॥
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="px-8 md:px-16 mb-12">
              <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                <Link
                  to="/shabda-manjari"
                  className="block bg-white border-6 border-blue-600 p-4 md:p-6 text-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <span
                    className="text-xl md:text-3xl font-bold text-black"
                    style={{ fontFamily: "serif" }}
                  >
                    शब्द-मञ्जरी
                  </span>
                </Link>

                <Link
                  to="/maheshvara-sutrani"
                  className="block bg-white border-6 border-blue-600 p-4 md:p-6 text-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <span
                    className="text-xl md:text-3xl font-bold text-black"
                    style={{ fontFamily: "serif" }}
                  >
                    महेश्वर-सूत्राणि
                  </span>
                </Link>

                <Link
                  to="/sutras"
                  className="block bg-white border-6 border-blue-600 p-4 md:p-6 text-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <span
                    className="text-xl md:text-3xl font-bold text-black"
                    style={{ fontFamily: "serif" }}
                  >
                    अष्टाध्यायी
                  </span>
                </Link>

                <Link
                  to="/pratishakhyam"
                  className="block bg-white border-6 border-blue-600 p-4 md:p-6 text-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <span
                    className="text-xl md:text-3xl font-bold text-black"
                    style={{ fontFamily: "serif" }}
                  >
                    प्रातिशाख्यम्
                  </span>
                </Link>
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
