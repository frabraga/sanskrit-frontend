/**
 * Tests for Sanskrit alphabetical sorting
 */

import { compareSanskrit, sortSanskritStrings, getVocabularySortKey } from './sanskritSort';

// Basic vowel ordering tests
console.log('=== Vowel Ordering Tests ===');
const vowels = ['ऊ', 'अ', 'इ', 'आ', 'ई', 'उ'];
const sortedVowels = sortSanskritStrings(vowels);
console.log('Input:', vowels);
console.log('Sorted:', sortedVowels);
console.log('Expected: अ आ इ ई उ ऊ');
console.log('');

// Basic consonant ordering tests
console.log('=== Consonant Ordering Tests ===');
const consonants = ['ग', 'क', 'च', 'ख'];
const sortedConsonants = sortSanskritStrings(consonants);
console.log('Input:', consonants);
console.log('Sorted:', sortedConsonants);
console.log('Expected: क ख ग च');
console.log('');

// Word ordering tests
console.log('=== Word Ordering Tests ===');
const words = ['गच्छति', 'अस्ति', 'भवति', 'करोति'];
const sortedWords = sortSanskritStrings(words);
console.log('Input:', words);
console.log('Sorted:', sortedWords);
console.log('Expected: अस्ति करोति गच्छति भवति');
console.log('');

// Verb root tests
console.log('=== Vocabulary Entry Tests ===');
const entries = [
  { word_type: 'verb', word_devanagari: 'गच्छति', root_devanagari: 'गम्' },
  { word_type: 'verb', word_devanagari: 'भवति', root_devanagari: 'भू' },
  { word_type: 'verb', word_devanagari: 'अस्ति', root_devanagari: 'अस्' },
  { word_type: 'substantive', word_devanagari: 'राम', root_devanagari: undefined },
];

const sortedEntries = [...entries].sort((a, b) => {
  const aKey = getVocabularySortKey(a);
  const bKey = getVocabularySortKey(b);
  return compareSanskrit(aKey, bKey);
});

console.log('Sorted entries:');
sortedEntries.forEach(entry => {
  const key = getVocabularySortKey(entry);
  console.log(`  ${key} (${entry.word_devanagari})`);
});
console.log('Expected order: अस् गम् भू राम');
console.log('');

// Comparison tests
console.log('=== Comparison Tests ===');
console.log('अ vs आ:', compareSanskrit('अ', 'आ'), '(should be negative)');
console.log('क vs ख:', compareSanskrit('क', 'ख'), '(should be negative)');
console.log('स vs श:', compareSanskrit('स', 'श'), '(should be positive)');
console.log('गम् vs भू:', compareSanskrit('गम्', 'भू'), '(should be negative)');
