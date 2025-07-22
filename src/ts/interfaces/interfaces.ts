export interface BaseApi {
  characters: string;
  locations: string;
  episodes: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export interface ApiResponseCharacter extends ApiResponse {
  results: Character[];
}

export interface ApiResponseLocation extends ApiResponse {
  results: Location[];
}

export interface ApiResponseEpisode extends ApiResponse {
  results: Episode[];
}

export interface State {
  loading: boolean;
  error: string | null;
}

export interface StateCharacter extends State {
  characters: Character[];
}

export interface StateLocation extends State {
  location: Location[];
}

export interface StateEpisode extends State {
  episode: Episode[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  loading?: boolean;
  showPageInfo?: boolean;
}
