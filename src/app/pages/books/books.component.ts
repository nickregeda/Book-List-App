import { Component, DestroyRef, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';

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
    MatInput,
    MatLabel,
    MatButton,
    MatFormField,
    MatProgressBar,

    BookItemComponent,
  ],
})
export class BooksComponent implements OnInit {
  private matDialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private booksService = inject(BooksService);

  private searchInputEl = viewChild<ElementRef>('searchInput');
  public books = this.booksService.books;
  public loading = this.booksService.loading;

  ngOnInit() {
    this.booksService.loadBooks();
    this.subscribeOnSearch();
  }

  private subscribeOnSearch(): void {
    fromEvent<Event>(this.searchInputEl().nativeElement, 'input')
    .pipe(
      map((event) => (event.target as HTMLInputElement).value),
      takeUntilDestroyed(this.destroyRef),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((query) => this.booksService.searchBook(query));
  }

  public openAddBookPopup(): void {
    this.matDialog.open(BookFormComponent, {
      panelClass: [ 'mat-book-popup', 'mat-add-book-popup' ],
    });
  }
}
