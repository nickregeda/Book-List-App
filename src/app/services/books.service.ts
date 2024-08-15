import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, take } from 'rxjs';

import { IBook } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = '/data/books.json';

  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  public books = signal<IBook[]>([]);
  public loading = signal<boolean>(false);

  public isEditMode = signal(false);

  private startLoading(): void {
    this.loading.set(true);
  }

  private finishLoading(): void {
    this.loading.set(false);
  }

  public loadBooks(): void {
    this.startLoading();

    this.http.get<{ books: IBook[] }>(this.baseUrl)
    .pipe(
      take(1),
      finalize(() => this.finishLoading()),
    )
    .subscribe({
      next: (response) => this.books.set(response.books),
      error: (error) => this.snackBar.open(error.message),
    });
  }

  public createBook(book: Omit<IBook, 'id'>): void {
    const newBook = { id: Date.now(), ...book };
    this.books.update((books) => [ ...books, newBook ]);
  }

  public updateBook(updatedBook: IBook): void {
    this.books.update((books) =>
      books.map((book) => book.id === updatedBook.id ? updatedBook : book));
  }

  public toggleEditMode(isEdit: boolean): void {
    this.isEditMode.set(isEdit);
  }
}
