import { Component, inject, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatProgressBar } from '@angular/material/progress-bar';

import { BooksService } from '../../services/books.service';
import { BookItemComponent } from '../../components/book-item/book-item.component';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('.2s ease-out', style({ opacity: 0, transform: 'scale(0.4)' })),
      ]),
    ]),
  ],
  imports: [ MatProgressBar, BookItemComponent ],
})
export class BooksComponent implements OnInit {
  private booksService = inject(BooksService);
  public books = this.booksService.books;
  public loading = this.booksService.loading;

  ngOnInit() {
    this.booksService.loadBooks();
  }
}
