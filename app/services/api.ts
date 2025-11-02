import type {
  StrapiResponse,
  Shabda,
  Sutra,
  PratisakhyaSutra,
  VocabularyEntry,
} from "~/types/sutra";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_KEY =
  "ffec5daf80d460d470b621ccb46c54570e6ce62c138c84d20c6c93469dac259c8c0209408a2bd0ad2966fecb10636b062759adbfbb6765d71ac9b185c22c97ff054f47b79adaa334e4eea25ff1272e45f698853f2a897294b39007d62d1ce606c376711c8b23050424133594a597711cded296a44978254f48c55d525734c829";

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
