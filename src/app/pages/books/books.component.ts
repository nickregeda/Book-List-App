import { Component, inject, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { BooksService } from '../../services/books.service';
import { BookItemComponent } from '../../components/book-item/book-item.component';
import { BookFormComponent } from '../../components/book-form/book-form.component';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.4)' }),
        animate('.2s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('.2s ease-in', style({ opacity: 0, transform: 'scale(0.4)' })),
      ]),
    ]),
  ],
  imports: [
    MatIcon,
    MatButton,
    MatProgressBar,
    BookItemComponent,
  ],
})
export class BooksComponent implements OnInit {
  private matDialog = inject(MatDialog);
  private booksService = inject(BooksService);
  public books = this.booksService.books;
  public loading = this.booksService.loading;

  ngOnInit() {
    this.booksService.loadBooks();
  }

  public openAddBookPopup(): void {
    this.matDialog.open(BookFormComponent, {
      panelClass: [ 'mat-book-popup', 'mat-add-book-popup' ],
    });
  }
}
