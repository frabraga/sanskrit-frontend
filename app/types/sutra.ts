export interface Sutra {
  id: number;
  documentId: string;
  number: string;
  sanskrit_text: string;
  transliteration: string;
  translation_portuguese: string;
  commentary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

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

export interface SutraResponse extends StrapiResponse<Sutra> {}
