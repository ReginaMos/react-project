export interface ErrorProps {
  children: React.ReactNode;
}

export interface SearchContextType {
  onSearch: (page: string, searchTerm: string) => void;
}

export interface ItemsContextType {
  items: ItemModel[];
  onClick: (id: string) => void;
}

export interface DetailsState {
  item: ItemModel;
  onClose: () => void;
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
  // id: number;
  name: string;
  description: string;
  gender: string;
  onClick: (id: string) => void;
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
