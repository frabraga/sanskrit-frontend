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
  order_index: number;
  is_published: boolean;
  declensions: Declension[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Sutra {
  id: number;
  number: string;
  sanskrit_text: string;
  sanskrit_explanation: string;
  portuguese_translation: string;
  chapter: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PratisakhyaSutra {
  id: number;
  number: string;
  sanskrit_text: string;
  portuguese_translation: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
