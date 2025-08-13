import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Sutra } from '../types/sutra';
import { ApiService } from '../services/api';
import { getSutraNavigation, type SutraNavigation } from '../utils/sutraNavigation';

interface SutraViewerProps {
  sutraNumber?: string;
}

export default function SutraViewer({ sutraNumber }: SutraViewerProps) {
  const navigate = useNavigate();
  const [sutra, setSutra] = useState<Sutra | null>(null);
  const [allSutras, setAllSutras] = useState<Sutra[]>([]);
  const [navigation, setNavigation] = useState<SutraNavigation>({ previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all sutras for navigation
        const allSutrasData = await ApiService.fetchSutras();
        setAllSutras(allSutrasData);
        
        let sutraData: Sutra | null = null;
        
        if (sutraNumber) {
          sutraData = await ApiService.fetchSutraByNumber(sutraNumber);
        } else {
          // Fetch the first sutra if no number specified
          sutraData = allSutrasData.length > 0 ? allSutrasData[0] : null;
        }
        
        setSutra(sutraData);
        
        // Calculate navigation
        if (sutraData && allSutrasData.length > 0) {
          const nav = getSutraNavigation(sutraData.number, allSutrasData);
          setNavigation(nav);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar sutra');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sutraNumber]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && navigation.previous) {
        navigate(`/sutra/${navigation.previous}`);
      } else if (event.key === 'ArrowRight' && navigation.next) {
        navigate(`/sutra/${navigation.next}`);
      } else if (event.key === 'Escape') {
        navigate('/sutras');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigation, navigate]);

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

  if (!sutra) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Sutra não encontrado</h2>
          <p className="text-gray-500">O sutra solicitado não foi encontrado.</p>
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
          <p className="text-lg text-orange-600">Ashtadhyayi de Panini</p>
        </header>

        {/* Sutra Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border border-orange-200 overflow-hidden">
            {/* Sutra Number */}
            <div className="bg-orange-500 text-white px-6 py-4">
              <h2 className="text-2xl font-bold text-center">
                Sutra {sutra.number}
              </h2>
            </div>

            <div className="p-8">
              {/* Sanskrit Text */}
              <div className="text-center mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Texto Sânscrito
                </h3>
                <p className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'serif' }}>
                  {sutra.sanskrit_text}
                </p>
              </div>

              {/* Transliteration */}
              <div className="text-center mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Transliteração
                </h3>
                <p className="text-2xl font-medium text-gray-700 italic">
                  {sutra.transliteration}
                </p>
              </div>

              {/* Portuguese Translation */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Tradução em Português
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed">
                  {sutra.translation_portuguese}
                </p>
              </div>

              {/* Commentary */}
              {sutra.commentary && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                    Comentário
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {sutra.commentary}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 space-y-4">
            {/* Sutra Navigation */}
            <div className="flex justify-center space-x-4">
              {navigation.previous ? (
                <Link
                  to={`/sutra/${navigation.previous}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  ← Sutra {navigation.previous}
                </Link>
              ) : (
                <div className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                  ← Anterior
                </div>
              )}
              
              {navigation.next ? (
                <Link
                  to={`/sutra/${navigation.next}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  Sutra {navigation.next} →
                </Link>
              ) : (
                <div className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed">
                  Próximo →
                </div>
              )}
            </div>
            
            {/* General Navigation */}
            <div className="flex justify-center space-x-4">
              <Link
                to="/sutras"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                📚 Lista de Sutras
              </Link>
              <Link
                to="/"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                🏠 Início
              </Link>
            </div>
            
            {/* Keyboard shortcuts info */}
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>
                Use as setas ← → para navegar entre sutras | 
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd> para voltar à lista
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
