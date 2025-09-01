import type { StrapiResponse, Shabda } from "~/types/sutra";

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

const apiHeaders = {
  'Content-Type': 'application/json',
  ...(STRAPI_API_KEY && { 'Authorization': `Bearer ${STRAPI_API_KEY}` })
};

export async function getAllShabdas(): Promise<Shabda[]> {
  const response = await fetch(`${STRAPI_URL}/api/shabdas?populate=declensions&sort=order_index:asc&filters[is_published][$eq]=true`, {
    headers: apiHeaders
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch shabdas: ${response.statusText}`);
  }
  
  const data: StrapiResponse<Shabda> = await response.json();
  return data.data;
}

export async function getShabdaById(id: number): Promise<Shabda | null> {
  const response = await fetch(`${STRAPI_URL}/api/shabdas/${id}?populate=declensions`, {
    headers: apiHeaders
  });
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch shabda: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data;
}

export async function getShabdaByIndex(orderIndex: number): Promise<Shabda | null> {
  const response = await fetch(`${STRAPI_URL}/api/shabdas?populate=declensions&filters[order_index][$eq]=${orderIndex}&filters[is_published][$eq]=true`, {
    headers: apiHeaders
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch shabda: ${response.statusText}`);
  }
  
  const data: StrapiResponse<Shabda> = await response.json();
  return data.data.length > 0 ? data.data[0] : null;
}
