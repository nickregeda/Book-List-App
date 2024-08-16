export interface IBook {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  publisher: string;
  language: string;

  coverImageUrl?: string;
  description?: string;
}
