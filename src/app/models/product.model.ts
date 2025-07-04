export interface Product {
  id?: string;
  sku: string;
  name: string;
  price: number;
  images: string[]; // URLs or base64 strings
} 