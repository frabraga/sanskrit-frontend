interface NavigationControlsProps {
  currentIndex: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
  itemType: string; // "Sutra", "Shabda", etc.
  className?: string;
}

export default function NavigationControls({
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
  itemType,
  className = "",
}: NavigationControlsProps) {
  return (
    <div className={`max-w-4xl mx-auto mb-4 ${className}`}>
      <div className="flex justify-between items-center px-4">
        <button
          onClick={onPrevious}
          disabled={currentIndex <= 1}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium"
        >
          ← Anterior
        </button>

        <div className="text-center">
          <span className="text-sm md:text-base text-gray-600 font-medium">
            {itemType} {currentIndex} de {totalCount}
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex >= totalCount}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors font-medium"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
