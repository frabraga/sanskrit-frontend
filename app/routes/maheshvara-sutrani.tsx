import SanskritLayout from "~/components/SanskritLayout";

export default function MaheshvaraSutraniPage() {
  const maheshvaraSutras = [
    "अ इ उ ण् । ऋ लृ क् ।",
    "ए ओ ङ् । ऐ औ च् ।",
    "ह य व र ट् । लं ण् ।",
    "ञ म ङ ण न म् ।",
    "झ भ ञ् । घ ढ ध ष् ।",
    "ज ब ग ड द श् ।",
    "ख फ छ ठ थ च त व् । क प य् ।",
    "श ष स र् । ह ल् ।"
  ];

  return (
    <SanskritLayout>
      <div className="p-2 md:p-4">
        <div className="container mx-auto">
          {/* Main Content Container with Blue Border */}
          <div className="max-w-4xl mx-auto bg-white border-4 md:border-8 border-blue-700 rounded-none shadow-2xl min-h-[80vh] relative overflow-hidden">
            
            {/* Header with Lamp Image */}
            <div className="text-center pt-8 pb-6">
              <div className="mb-4">
                {/* Lamp Image */}
                <img 
                  src="/images/lamp.png" 
                  alt="Lamp" 
                  className="w-16 h-20 md:w-20 md:h-24 mx-auto mb-2"
                />
              </div>
              <h1
                className="text-4xl md:text-6xl font-bold text-black mb-8"
                style={{ fontFamily: "serif" }}
              >
                महेश्वर-सूत्राणि
              </h1>
            </div>

            {/* Content Section */}
            <div className="px-4 md:px-12 pb-16">
              {/* Sutras */}
              <div className="space-y-6 text-center">
                {maheshvaraSutras.map((sutra, index) => {
                  // Define which characters should be red for each sutra based on the image
                  const renderSutraWithHighlights = (text: string, sutraIndex: number) => {
                    const parts = [];
                    let i = 0;
                    
                    while (i < text.length) {
                      // Check for red characters (pratyahara markers)
                      if (text[i] === 'ण' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ण्</span>);
                        i += 2;
                      } else if (text[i] === 'क' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">क्</span>);
                        i += 2;
                      } else if (text[i] === 'ङ' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ङ्</span>);
                        i += 2;
                      } else if (text[i] === 'च' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">च्</span>);
                        i += 2;
                      } else if (text[i] === 'ट' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ट्</span>);
                        i += 2;
                      } else if (text[i] === 'म' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">म्</span>);
                        i += 2;
                      } else if (text[i] === 'ञ' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ञ्</span>);
                        i += 2;
                      } else if (text[i] === 'ष' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ष्</span>);
                        i += 2;
                      } else if (text[i] === 'श' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">श्</span>);
                        i += 2;
                      } else if (text[i] === 'व' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">व्</span>);
                        i += 2;
                      } else if (text[i] === 'य' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">य्</span>);
                        i += 2;
                      } else if (text[i] === 'र' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">र्</span>);
                        i += 2;
                      } else if (text[i] === 'ल' && i + 1 < text.length && text[i + 1] === '्') {
                        parts.push(<span key={i} className="text-red-600 font-bold">ल्</span>);
                        i += 2;
                      } else {
                        parts.push(<span key={i} className="text-black">{text[i]}</span>);
                        i++;
                      }
                    }
                    
                    return parts;
                  };

                  return (
                    <div key={index} className="text-2xl md:text-4xl leading-relaxed font-bold text-black" style={{ fontFamily: "serif" }}>
                      {renderSutraWithHighlights(sutra, index)}
                    </div>
                  );
                })}
              </div>

              {/* Closing Statement */}
              <div className="text-center mt-12 text-xl md:text-2xl font-bold text-black" style={{ fontFamily: "serif" }}>
                इति माहेश्वराणि सूत्राणि ॥
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
