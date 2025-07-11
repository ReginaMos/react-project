import * as React from 'react';

export interface Props {
  children: React.ReactNode;
};

export interface State {
  hasError: boolean;
  error: Error | null;
};

export interface ButtonProps {
  text: string;
  onAction: () => void;
};

export interface ItemModel {
  name: string;
  description: string;
}

export interface ItemProps extends ItemModel {
  key: number;
}

export interface ItemState {
  items: ItemModel[];
}

export interface PersonShort {
  uid: string;
  name: string;
  url: string;
};
