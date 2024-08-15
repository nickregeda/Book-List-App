import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-book-info',
  standalone: true,
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss',
  imports: [
    MatButton,
  ],
})
export class BookInfoComponent {
  private matDialogRef = inject(MatDialogRef);
  private booksService = inject(BooksService);
  public book = input.required<IBook>();

  public enableEditMode(): void {
    this.booksService.toggleEditMode(true);
  }

  public removeBook(): void {
    const confirmRemove = confirm(`Are you sure to delete this book: ${ this.book().title }?`);
    if (confirmRemove) {
      this.matDialogRef.close();
      setTimeout(() => this.booksService.removeBook(this.book().id), 500);
    }
  }
}
