import type { ApiResponseCharacter } from '../ts/interfaces/interfaces';

const BASE_URL = import.meta.env.VITE_RICK_AND_MORTY_BASE_URL;

export async function fetchCharacters(
  name = ''
): Promise<ApiResponseCharacter> {
  if (!BASE_URL) {
    throw new Error('API URL is not defined in environment variables');
  }

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
