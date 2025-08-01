import { create } from 'zustand';
import type { Character } from '../ts/interfaces/interfaces';

export const useCharactersStore = create<Character>();
