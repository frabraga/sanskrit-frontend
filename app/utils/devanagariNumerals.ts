const DEVANAGARI_TO_ARABIC: Record<string, string> = {
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

/** Converts any Devanagari digits in a string to Arabic digits; leaves everything else untouched. */
export function devanagariToArabic(input: string): string {
  return input.replace(/[०-९]/g, (d) => DEVANAGARI_TO_ARABIC[d] ?? d);
}

/** Arabic-digit form with separators (., /, spaces) preserved — for "contains 1.2" style matching. */
export function normalizeNumber(input: string): string {
  return devanagariToArabic(input).trim();
}

/** Arabic digits only, all separators stripped — for tolerant "127" style matching against "1.2.7". */
export function digitsOnly(input: string): string {
  return devanagariToArabic(input).replace(/\D/g, "");
}
