export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Declension {
  id: number;
  case_label: string;
  singular: string;
  dual: string;
  plural: string;
}

export interface Shabda {
  id: number;
  title: string;
  category: string;
  prakarana_label: string;
  order_index: number;
  is_published: boolean;
  declensions: Declension[];
  audio?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Sutra {
  id: number;
  number: string;
  sutra_text: string;
  sanskrit_explanation: string;
  portuguese_translation: string;
  chapter_heading: string;
  pada_heading: string;
  padaccheda: string;
  anuvrtti: string;
  vrtti: string;
  example: string;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PratisakhyaSutra {
  id: number;
  number: string;
  sutra_text: string;
  chapter_heading: string;
  bhashya: string;
  portuguese_translation: string;
  bhashya_translation_pt: string;
  verse_explanation_pt: string;
  example: string;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type WordType = "verb" | "substantive" | "indeclinable";
export type Gender = "masculine" | "feminine" | "neuter";
export type Voice = "parasmaipada" | "atmanepada" | "ubhayapada";

export interface VocabularyEntry {
  id: number;
  documentId?: string;
  word_type: WordType;
  word_devanagari: string;
  order_index: number;
  is_published: boolean;
  lesson_reference?: string;
  notes?: string;
  
  // Transliteration fields
  itrans?: string;
  iast?: string;
  harvard_kyoto?: string;
  
  // Translation fields
  meaning_pt?: string;
  meaning_es?: string;
  meaning_en?: string;
  
  // Substantive-specific fields
  gender?: Gender;
  
  // Indeclinable-specific fields
  grammatical_case?: string;
  
  // Verb-specific fields
  root_devanagari?: string;
  verb_class?: number;
  voice?: Voice;
  standard_form?: string;
  past_imperfect?: string;
  potential?: string;
  imperative?: string;
  past_participle?: string;
  gerund?: string;
  infinitive?: string;
  ppp?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Type guards for vocabulary entries
export interface VerbEntry extends VocabularyEntry {
  word_type: "verb";
  verb_class: number;
  voice: Voice;
}

export interface SubstantiveEntry extends VocabularyEntry {
  word_type: "substantive";
  gender: Gender;
}

export interface IndeclinableEntry extends VocabularyEntry {
  word_type: "indeclinable";
}
