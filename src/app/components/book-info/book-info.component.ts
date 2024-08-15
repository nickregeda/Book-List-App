import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';

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
  private booksService = inject(BooksService);
  public book = input.required<IBook>();

  public enableEditMode(): void {
    this.booksService.toggleEditMode(true);
  }
}
