import type { Sutra } from '../types/sutra';

export interface SutraNavigation {
  previous: string | null;
  next: string | null;
}

/**
 * Parses a sutra number string (e.g., "1.1.1") into its components
 */
export function parseSutraNumber(number: string): { chapter: number; section: number; sutra: number } | null {
  const parts = number.split('.').map(n => parseInt(n, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    return null;
  }
  return {
    chapter: parts[0],
    section: parts[1],
    sutra: parts[2]
  };
}

/**
 * Formats sutra components back into a string
 */
export function formatSutraNumber(chapter: number, section: number, sutra: number): string {
  return `${chapter}.${section}.${sutra}`;
}

/**
 * Calculates the next sutra number in sequence
 */
export function getNextSutraNumber(currentNumber: string): string | null {
  const parsed = parseSutraNumber(currentNumber);
  if (!parsed) return null;

  // For now, we'll increment the sutra number within the same section
  // In a real implementation, you might want to handle section/chapter boundaries
  return formatSutraNumber(parsed.chapter, parsed.section, parsed.sutra + 1);
}

/**
 * Calculates the previous sutra number in sequence
 */
export function getPreviousSutraNumber(currentNumber: string): string | null {
  const parsed = parseSutraNumber(currentNumber);
  if (!parsed) return null;

  // Don't go below 1
  if (parsed.sutra <= 1) {
    // In a real implementation, you might want to go to the previous section
    return null;
  }

  return formatSutraNumber(parsed.chapter, parsed.section, parsed.sutra - 1);
}

/**
 * Gets navigation info for a sutra based on available sutras list
 */
export function getSutraNavigation(currentNumber: string, allSutras: Sutra[]): SutraNavigation {
  // Sort sutras by their number for proper navigation
  const sortedSutras = [...allSutras].sort((a, b) => {
    const aNum = parseSutraNumber(a.number);
    const bNum = parseSutraNumber(b.number);
    
    if (!aNum || !bNum) return 0;
    
    // Compare chapter, then section, then sutra
    if (aNum.chapter !== bNum.chapter) return aNum.chapter - bNum.chapter;
    if (aNum.section !== bNum.section) return aNum.section - bNum.section;
    return aNum.sutra - bNum.sutra;
  });

  const currentIndex = sortedSutras.findIndex(sutra => sutra.number === currentNumber);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0 ? sortedSutras[currentIndex - 1].number : null;
  const next = currentIndex < sortedSutras.length - 1 ? sortedSutras[currentIndex + 1].number : null;

  return { previous, next };
}
