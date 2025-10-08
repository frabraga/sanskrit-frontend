import type {
  StrapiResponse,
  Shabda,
  Sutra,
  PratisakhyaSutra,
  VocabularyEntry,
} from "~/types/sutra";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_KEY =
  "6e47118ecd0462d7310dc80c58df163f3d4a3ffee93a7190bd3b01e4711683229caeb14d8b57b6902629bb44167168dc47576adbeea5f02629973be0ae9a41263c1ad42847213c08dc9274c88a6a0e677139d72ef5f8ac8ca3c0b67ee79859f92cd161e4174ef0f4df1f63782b058f55f3ae34d01002eb40cd8dea716f2824cf";

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
    `${STRAPI_URL}/api/vocabularies?sort=order_index:asc&filters[is_published][$eq]=true`,
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
