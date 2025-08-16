export interface ErrorProps {
  children: React.ReactNode;
}

export interface SearchContextType {
  onSearch: (page: string, searchTerm: string) => void;
  onRefresh: () => void;
}

export interface ItemsContextType {
  items: ItemModel[];
  onItemClick: (id: number) => void;
}

export interface DetailsState {
  item: ItemModel;
}

export interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: string) => void;
  pagesCount: number;
}

export interface APIResponse {
  items: ItemModel[];
  count: number;
}

export interface State {
  hasError: boolean;
  error: Error | null;
}

export interface ButtonProps {
  text: string;
  onAction: () => void;
  class: string;
}

export interface ChipsProps {
  text: string;
}

export interface OutletContext {
  selectedItem: ItemModel | undefined;
  handleCloseDetails: () => void;
}

export interface ItemModel {
  id: number;
  name: string;
  description: string;
  gender: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  height: string;
  hair_color: string;
}

export interface ShortItemModel {
  id: number;
  name: string;
  description: string;
  gender: string;
  onToggle: (id: number, inStore: boolean) => void;
  onItemClick: (id: number) => void;
}

export interface PersonShort {
  uid: string;
  name: string;
  url: string;
}

export interface PersonFind {
  properties: Record<string, string>;
  __id: number;
  description: string;
  uid: string;
  _v: number;
}

export interface PeopleShortListResponse {
  results: PersonShort[];
  total_pages: number;
}

export interface PeopleFindListResponse {
  result: PersonFind[];
  total_pages: number;
}

export interface PeopleInfoResponse {
  result: PersonFind;
}

export interface DetailedPersonResponse {
  result: ItemModel;
}

export interface HomePageProps {
  initialPage: number;
  initialHeroId: string | null;
  initialFind: string;
  locale: string;
}

export interface AboutPageProps {
  locale: string ;
};
