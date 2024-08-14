import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  private booksService = inject(BooksService);
  public books = this.booksService.books;

  ngOnInit() {
    this.booksService.loadBooks();
  }
}
