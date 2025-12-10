import { Product } from '../store/services/productsApi';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Feed: undefined;
  PostDetail: { post: Post };
  ProductDetail: { product: Product };
};

export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
};
