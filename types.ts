import type { ReactElement } from 'react';

export enum ActiveTab {
  HOME = 'HOME',
  TRY_ON = 'TRY_ON',
  STORE = 'STORE',
  PROFILE = 'PROFILE',
}

export interface TabItem {
  id: ActiveTab;
  label: string;
  // Fix: Replaced JSX.Element with ReactElement to resolve "Cannot find namespace 'JSX'".
  icon: (props: { className?: string }) => ReactElement;
}

export enum ProductCategory {
  SHIRT = 'Shirt',
  SHOES = 'Shoes',
  GLASSES = 'Glasses',
  ACCESSORIES = 'Accessories',
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  imageUrl: string;
  category: ProductCategory;
}

export interface PlacedProduct {
  id: string;
  productId: number;
  imageUrl: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface SavedOutfit {
  id: number;
  imageUrl: string;
  createdAt: string;
}

export interface HistoryItem {
  id: number;
  product: Product;
  triedOn: string;
}
