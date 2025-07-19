export interface ErrorProps {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
  error: Error | null;
}

export interface PropsFunction {
  onSearch: (value: string) => void;
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

export interface ItemState {
  items: ItemModel[];
  isLoading?: boolean;
  isApiError?: string;
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
