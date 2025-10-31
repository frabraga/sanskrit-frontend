import type {
  StrapiResponse,
  Shabda,
  Sutra,
  PratisakhyaSutra,
  VocabularyEntry,
} from "~/types/sutra";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

const apiHeaders = {
  "Content-Type": "application/json",
  ...(STRAPI_API_KEY && { Authorization: `Bearer ${STRAPI_API_KEY}` }),
};

export async function getAllShabdas(): Promise<Shabda[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/shabdas?populate[declensions]=true&populate[audio]=true&sort=order_index:asc&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch shabdas: ${response.statusText}`);
  }

  const data: StrapiResponse<Shabda> = await response.json();
  return data.data;
}

export async function getShabdaById(id: number): Promise<Shabda | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/shabdas/${id}?populate[declensions]=true&populate[audio]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch shabda: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

export async function getShabdaByIndex(
  orderIndex: number
): Promise<Shabda | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/shabdas?populate[declensions]=true&populate[audio]=true&filters[order_index][$eq]=${orderIndex}&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch shabda: ${response.statusText}`);
  }

  const data: StrapiResponse<Shabda> = await response.json();
  return data.data.length > 0 ? data.data[0] : null;
}

export async function getAllSutras(): Promise<Sutra[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/panini-sutras?sort=order_index:asc&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch sutras: ${response.statusText}`);
  }

  const data: StrapiResponse<Sutra> = await response.json();
  return data.data;
}

export async function getSutraByNumber(number: string): Promise<Sutra | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/panini-sutras?filters[number][$eq]=${number}&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch sutra: ${response.statusText}`);
  }

  const data: StrapiResponse<Sutra> = await response.json();
  return data.data.length > 0 ? data.data[0] : null;
}

export async function getAllPratisakhyaSutras(): Promise<PratisakhyaSutra[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/pratisakhya-sutras?sort=order_index:asc&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pratisakhya sutras: ${response.statusText}`
    );
  }

  const data: StrapiResponse<PratisakhyaSutra> = await response.json();
  return data.data;
}

export async function getPratisakhyaSutraByNumber(
  number: string
): Promise<PratisakhyaSutra | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/pratisakhya-sutras?filters[number][$eq]=${number}&filters[is_published][$eq]=true`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pratisakhya sutra: ${response.statusText}`
    );
  }

  const data: StrapiResponse<PratisakhyaSutra> = await response.json();
  return data.data.length > 0 ? data.data[0] : null;
}

export async function getAllVocabulary(): Promise<VocabularyEntry[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/vocabularies?sort=order_index:asc&filters[is_published][$eq]=true&pagination[pageSize]=1000`,
    {
      headers: apiHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch vocabulary: ${response.statusText}`);
  }

  const data: StrapiResponse<VocabularyEntry> = await response.json();
  return data.data;
}
