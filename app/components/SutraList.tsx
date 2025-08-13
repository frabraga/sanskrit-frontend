import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Sutra } from '../types/sutra';
import { ApiService } from '../services/api';

export default function SutraList() {
  const [sutras, setSutras] = useState<Sutra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSutras = async () => {
      try {
        setLoading(true);
        setError(null);
        const sutrasData = await ApiService.fetchSutras();
        setSutras(sutrasData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar sutras');
      } finally {
        setLoading(false);
      }
    };

    fetchSutras();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">
            अष्टाध्यायी
          </h1>
          <p className="text-lg text-orange-600">Lista de Sutras</p>
        </header>

        {/* Sutras Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sutras.map((sutra) => (
              <Link
                key={sutra.id}
                to={`/sutra/${sutra.number}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-orange-200 overflow-hidden group"
              >
                {/* Sutra Number Header */}
                <div className="bg-orange-500 group-hover:bg-orange-600 transition-colors text-white px-4 py-3">
                  <h3 className="font-bold text-center">
                    Sutra {sutra.number}
                  </h3>
                </div>

                <div className="p-6">
                  {/* Sanskrit Text */}
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'serif' }}>
                      {sutra.sanskrit_text}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      {sutra.transliteration}
                    </p>
                  </div>

                  {/* Portuguese Translation */}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {sutra.translation_portuguese}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {sutras.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">
                Nenhum sutra encontrado
              </h2>
              <p className="text-gray-500">
                Adicione alguns sutras no Strapi para vê-los aqui.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
