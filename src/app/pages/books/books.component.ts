import { Component, inject, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';
import { BookItemComponent } from '../../components/book-item/book-item.component';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  imports: [ BookItemComponent ],
})
export class BooksComponent implements OnInit {
  private booksService = inject(BooksService);
  public books = this.booksService.books;

  ngOnInit() {
    this.booksService.loadBooks();
  }
}
