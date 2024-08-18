import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, finalize, take } from 'rxjs';

import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = '/data/books.json';

  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  private ALL_BOOKS: IBook[] = [];
  public books = signal<IBook[]>([]);
  public loading = signal<boolean>(false);

  public isEditMode = signal(false);
  public searchQuery = signal('');

  private startLoading(): void {
    this.loading.set(true);
  }

  private finishLoading(): void {
    this.loading.set(false);
  }

  private setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  public loadBooks(): void {
    this.startLoading();

    this.http.get<{ books: IBook[] }>(this.baseUrl)
    .pipe(
      take(1),
      delay(800),
      finalize(() => this.finishLoading()),
    )
    .subscribe({
      next: (response) => {
        this.books.set(response.books);
        this.ALL_BOOKS = response.books;
      },
      error: (error) => this.snackBar.open(error.message),
    });
  }

  public createBook(book: Omit<IBook, 'id'>): void {
    const newBook = { id: Date.now(), ...book };
    this.books.update((books) => [ newBook, ...books ]);
  }

  public updateBook(updatedBook: IBook): void {
    this.books.update((books) =>
      books.map((book) => book.id === updatedBook.id ? updatedBook : book));
  }

  public removeBook(bookId: number): void {
    this.books.update((books) =>
      books.filter((book) => book.id !== bookId));
  }

  public toggleEditMode(isEdit: boolean): void {
    this.isEditMode.set(isEdit);
  }

  public searchBook(query: string): void {
    this.setSearchQuery(query);
    if (!query) {
      this.books.set(this.ALL_BOOKS);
      return;
    }

    query = query.toLowerCase();
    this.books.update(() =>
      this.ALL_BOOKS.filter((book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)));
  }
}
