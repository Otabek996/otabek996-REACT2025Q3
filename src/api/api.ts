import type {
  ApiResponseCharacter,
  Character,
} from '../ts/interfaces/interfaces';

function getBaseUrl(): string {
  const rawUrl = import.meta.env.VITE_RICK_AND_MORTY_BASE_URL;
  if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
    throw new Error('API URL is not defined in environment variables');
  }
  return rawUrl.trim();
}

export async function fetchCharacters(
  name = ''
): Promise<ApiResponseCharacter> {
  const BASE_URL = getBaseUrl();

  const url = name
    ? `${BASE_URL}/character?name=${name}`
    : `${BASE_URL}/character`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ApiResponseCharacter = await response.json();
  return data;
}

export async function fetchCharactersPagination(
  url: string
): Promise<ApiResponseCharacter> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ApiResponseCharacter = await response.json();
  return data;
}

export async function fetchCharacterById(id: string): Promise<Character> {
  const BASE_URL = getBaseUrl();

  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('Character not found');
  }

  const data: Character = await response.json();
  return data;
}
