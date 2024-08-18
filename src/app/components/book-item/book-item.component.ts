import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BookPopupComponent } from '../book-popup/book-popup.component';
import { IBook } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { SearchHighlightPipe } from '../../pipes/search-highlight.pipe';

@Component({
  selector: 'app-book-item',
  standalone: true,
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss',
  imports: [ NgOptimizedImage, SearchHighlightPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItemComponent {
  private matDialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private booksService = inject(BooksService);

  public book = input.required<IBook>();
  public searchQuery = this.booksService.searchQuery;

  public openBookInfo(): void {
    const dialogRef = this.matDialog.open(BookPopupComponent, {
      data: this.book,
      panelClass: 'mat-book-popup',
    });

    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => this.booksService.toggleEditMode(false));
  }
}
