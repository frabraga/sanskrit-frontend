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
