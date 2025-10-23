

import { HomeIcon, SparklesIcon, StoreIcon, UserIcon } from './components/Icons';
import { ActiveTab, Product, ProductCategory, TabItem, SavedOutfit, HistoryItem } from './types';

export const TABS: TabItem[] = [
  { id: ActiveTab.HOME, label: 'Home', icon: HomeIcon },
  { id: ActiveTab.TRY_ON, label: 'Try-On', icon: SparklesIcon },
  { id: ActiveTab.STORE, label: 'Store', icon: StoreIcon },
  { id: ActiveTab.PROFILE, label: 'Profile', icon: UserIcon },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Gradient T-Shirt',
    price: 45.0,
    discount: 20,
    imageUrl: 'https://picsum.photos/id/11/400/400',
    category: ProductCategory.SHIRT,
  },
  {
    id: 2,
    name: 'Classic Leather Shoes',
    price: 120.0,
    imageUrl: 'https://picsum.photos/id/21/400/400',
    category: ProductCategory.SHOES,
  },
  {
    id: 3,
    name: 'Aviator Sunglasses',
    price: 75.0,
    imageUrl: 'https://picsum.photos/id/40/400/400',
    category: ProductCategory.GLASSES,
  },
  {
    id: 4,
    name: 'Minimalist Watch',
    price: 250.0,
    discount: 10,
    imageUrl: 'https://picsum.photos/id/175/400/400',
    category: ProductCategory.ACCESSORIES,
  },
  {
    id: 5,
    name: 'Urban Graphic Tee',
    price: 35.0,
    imageUrl: 'https://picsum.photos/id/145/400/400',
    category: ProductCategory.SHIRT,
  },
  {
    id: 6,
    name: 'High-Top Sneakers',
    price: 95.0,
    imageUrl: 'https://picsum.photos/id/211/400/400',
    category: ProductCategory.SHOES,
  },
  {
    id: 7,
    name: 'Retro Round Glasses',
    price: 60.0,
    discount: 5,
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    category: ProductCategory.GLASSES,
  },
  {
    id: 8,
    name: 'Leather Backpack',
    price: 180.0,
    imageUrl: 'https://picsum.photos/id/305/400/400',
    category: ProductCategory.ACCESSORIES,
  },
];

export const MOCK_SAVED_OUTFITS: SavedOutfit[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/a/800/1000', createdAt: '2 days ago' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/b/800/1000', createdAt: '5 days ago' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/c/800/1000', createdAt: '1 week ago' },
    { id: 4, imageUrl: 'https://picsum.photos/seed/d/800/1000', createdAt: '2 weeks ago' },
];

export const MOCK_HISTORY_ITEMS: HistoryItem[] = [
    { id: 1, product: MOCK_PRODUCTS[0], triedOn: '1 day ago' },
    { id: 2, product: MOCK_PRODUCTS[2], triedOn: '3 days ago' },
    { id: 3, product: MOCK_PRODUCTS[5], triedOn: '1 week ago' },
    { id: 4, product: MOCK_PRODUCTS[7], triedOn: '2 weeks ago' },
];
