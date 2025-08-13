import { Link } from "react-router";

export function meta() {
  return [
    { title: "Ashtadhyayi - अष्टाध्यायी" },
    {
      name: "description",
      content: "Explore the sutras of Panini's Ashtadhyayi",
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-orange-800 mb-4">
            अष्टाध्यायी
          </h1>
          <h2 className="text-3xl font-semibold text-orange-700 mb-6">
            Ashtadhyayi
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore os sutras fundamentais da gramática sânscrita de Panini, uma
            das obras mais importantes da linguística antiga.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <Link
            to="/sutras"
            className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-orange-200 overflow-hidden group"
          >
            <div className="bg-orange-500 group-hover:bg-orange-600 transition-colors text-white px-6 py-4">
              <h3 className="text-2xl font-bold text-center">
                📚 Lista de Sutras
              </h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg">
                Navegue por todos os sutras disponíveis e explore seus
                significados e comentários.
              </p>
            </div>
          </Link>

          <Link
            to="/sutra/1.1.1"
            className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-orange-200 overflow-hidden group"
          >
            <div className="bg-orange-500 group-hover:bg-orange-600 transition-colors text-white px-6 py-4">
              <h3 className="text-2xl font-bold text-center">
                🎯 Primeiro Sutra
              </h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg">
                Comece sua jornada com o primeiro sutra:
                <em>vṛddhir ādaic</em>
              </p>
            </div>
          </Link>
        </div>

        {/* About Section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md border border-orange-200 p-8">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">
              Sobre o Ashtadhyayi
            </h3>
            <p className="text-gray-700 leading-relaxed">
              O Ashtadhyayi (अष्टाध्यायी) é uma gramática sânscrita composta por
              Panini por volta do século IV a.C. Consiste em aproximadamente
              4.000 sutras (regras) organizados em oito capítulos, fornecendo
              uma descrição sistemática e abrangente da língua sânscrita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
