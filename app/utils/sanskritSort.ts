/**
 * Sanskrit Alphabet Order Utility
 * 
 * Provides sorting functionality for Sanskrit/Devanagari text according to
 * traditional alphabetical order (varṇamālā).
 */

/**
 * Traditional Sanskrit alphabet order (Devanagari)
 * Vowels (स्वराः): अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ
 * Anusvāra and Visarga: अं अः
 * Consonants (व्यञ्जनानि):
 *   - Velars: क ख ग घ ङ
 *   - Palatals: च छ ज झ ञ
 *   - Retroflexes: ट ठ ड ढ ण
 *   - Dentals: त थ द ध न
 *   - Labials: प फ ब भ म
 *   - Semivowels: य र ल व
 *   - Sibilants: श ष स
 *   - Aspirate: ह
 */
const SANSKRIT_ALPHABET_ORDER: Record<string, number> = {
  // Independent vowels
  'अ': 1, 'आ': 2, 'इ': 3, 'ई': 4, 'उ': 5, 'ऊ': 6,
  'ऋ': 7, 'ॠ': 8, 'ऌ': 9, 'ॡ': 10,
  'ए': 11, 'ऐ': 12, 'ओ': 13, 'औ': 14,
  
  // Anusvāra and Visarga
  'अं': 15, 'ं': 15,
  'अः': 16, 'ः': 16,
  
  // Consonants - Velars (ka-varga)
  'क': 17, 'ख': 18, 'ग': 19, 'घ': 20, 'ङ': 21,
  
  // Consonants - Palatals (ca-varga)
  'च': 22, 'छ': 23, 'ज': 24, 'झ': 25, 'ञ': 26,
  
  // Consonants - Retroflexes (ṭa-varga)
  'ट': 27, 'ठ': 28, 'ड': 29, 'ढ': 30, 'ण': 31,
  
  // Consonants - Dentals (ta-varga)
  'त': 32, 'थ': 33, 'द': 34, 'ध': 35, 'न': 36,
  
  // Consonants - Labials (pa-varga)
  'प': 37, 'फ': 38, 'ब': 39, 'भ': 40, 'म': 41,
  
  // Semivowels (antaḥsthāḥ)
  'य': 42, 'र': 43, 'ल': 44, 'व': 45,
  
  // Sibilants (ūṣmāṇaḥ)
  'श': 46, 'ष': 47, 'स': 48,
  
  // Aspirate
  'ह': 49,
  
  // Additional characters
  'ळ': 50, // Retroflex lateral (rare)
  'क्ष': 51, // kṣa
  'ज्ञ': 52, // jña
  
  // Vowel signs (mātrā) - treated same as independent vowels
  'ा': 2, 'ि': 3, 'ी': 4, 'ु': 5, 'ू': 6,
  'ृ': 7, 'ॄ': 8, 'ॢ': 9, 'ॣ': 10,
  'े': 11, 'ै': 12, 'ो': 13, 'ौ': 14,
  
  // Virama (halanta)
  '्': 0,
};

/**
 * Get the Sanskrit alphabet order value for a character
 */
function getCharOrder(char: string): number {
  return SANSKRIT_ALPHABET_ORDER[char] ?? 1000 + char.charCodeAt(0);
}

/**
 * Extract the first meaningful character from a Devanagari string
 * Handles conjuncts and diacritics properly
 */
function getFirstSanskritChar(text: string): string {
  if (!text) return '';
  
  // Remove leading whitespace and common punctuation
  const cleaned = text.trim().replace(/^[।॥\s]+/, '');
  if (!cleaned) return '';
  
  // Get first character (may be part of a conjunct)
  return cleaned.charAt(0);
}

/**
 * Compare two Devanagari strings according to Sanskrit alphabetical order
 * Returns: negative if a < b, positive if a > b, 0 if equal
 */
export function compareSanskrit(a: string, b: string): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  
  const aChars = Array.from(a.trim());
  const bChars = Array.from(b.trim());
  
  const maxLength = Math.max(aChars.length, bChars.length);
  
  for (let i = 0; i < maxLength; i++) {
    const aChar = aChars[i] || '';
    const bChar = bChars[i] || '';
    
    if (!aChar) return -1;
    if (!bChar) return 1;
    
    const aOrder = getCharOrder(aChar);
    const bOrder = getCharOrder(bChar);
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
  }
  
  return 0;
}

/**
 * Sort an array of strings in Sanskrit alphabetical order
 */
export function sortSanskritStrings(strings: string[]): string[] {
  return [...strings].sort(compareSanskrit);
}

/**
 * Get the sort key for a vocabulary entry
 * For verbs, use the root; for other words, use the main word
 */
export function getVocabularySortKey(entry: {
  word_type: string;
  word_devanagari: string;
  root_devanagari?: string;
}): string {
  if (entry.word_type === 'verb' && entry.root_devanagari) {
    return entry.root_devanagari;
  }
  return entry.word_devanagari;
}
