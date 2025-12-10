import { baseApi } from './baseApi';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = productsApi;
