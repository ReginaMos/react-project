export interface ErrorProps {
  children: React.ReactNode;
}

export interface SearchContextType {
  onSearch: (searchTerm: string) => void;
};

export interface ItemsContextType {
  items: ItemModel[];
};

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
  name: string;
  description: string;
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
