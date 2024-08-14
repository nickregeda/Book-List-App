import { Component, inject, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  imports: [ NgOptimizedImage ],
})
export class BooksComponent implements OnInit {
  private booksService = inject(BooksService);
  public books = this.booksService.books;

  ngOnInit() {
    this.booksService.loadBooks();
  }
}
