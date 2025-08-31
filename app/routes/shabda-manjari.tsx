import SanskritLayout from "~/components/SanskritLayout";

export default function ShabdaManjariPage() {
  return (
    <SanskritLayout>
      <div className="p-2 md:p-4">
        <div className="container mx-auto">
          {/* Main Content Container with Blue Border */}
          <div className="max-w-6xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            {/* Content Section */}
            <div className="px-2 md:px-8 pb-8 md:pb-16">
              {/* Subantam Section */}
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 mt-4 md:mt-8"
                  style={{ fontFamily: "serif" }}
                >
                  सुबन्तम्
                </h2>
                <h3
                  className="text-lg md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6"
                  style={{ fontFamily: "serif" }}
                >
                  १. अकारान्तः पुंलिङ्गः 'राम' शब्दः (Rāma)
                </h3>
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
                    {/* Nominative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        1
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामः
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामौ
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाः
                      </td>
                    </tr>
                    {/* Vocative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        V
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        हे राम
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        हे रामौ
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        हे रामाः
                      </td>
                    </tr>
                    {/* Accusative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        2
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामम्
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामौ
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामान्
                      </td>
                    </tr>
                    {/* Instrumental */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        3
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामेण
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाभ्याम्
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामैः
                      </td>
                    </tr>
                    {/* Dative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        4
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाय
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाभ्याम्
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामेभ्यः
                      </td>
                    </tr>
                    {/* Ablative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        5
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामात्
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाभ्याम्
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामेभ्यः
                      </td>
                    </tr>
                    {/* Genitive */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        6
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामस्य
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामयोः
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-100 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामाणाम्
                      </td>
                    </tr>
                    {/* Locative */}
                    <tr>
                      <td className="border-2 border-blue-700 bg-blue-500 text-white p-1 md:p-4 text-center text-sm md:text-xl font-bold">
                        7
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामे
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामयोः
                      </td>
                      <td
                        className="border-2 border-blue-700 bg-blue-50 text-black p-1 md:p-4 text-center text-base md:text-2xl"
                        style={{ fontFamily: "serif" }}
                      >
                        रामेषु
                      </td>
                    </tr>
                  </tbody>
                </table>
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
