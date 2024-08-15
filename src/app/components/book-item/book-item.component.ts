import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { BookPopupComponent } from '../book-popup/book-popup.component';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-book-item',
  standalone: true,
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss',
  imports: [ NgOptimizedImage ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookItemComponent {
  private matDialog = inject(MatDialog);
  public book = input.required<IBook>();

  public openBookInfo(): void {
    this.matDialog.open(BookPopupComponent, {
      data: this.book,
      panelClass: 'mat-book-popup',
    });
  }
}
