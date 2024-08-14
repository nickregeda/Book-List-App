export interface IBook {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  publisher: string;
  language: string;

  pageCount?: number;
  coverImageUrl?: string;
  description?: string;
}
