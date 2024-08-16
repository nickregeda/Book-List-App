import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

import { BookFormComponent } from '../book-form/book-form.component';
import { BookInfoComponent } from '../book-info/book-info.component';
import { BooksService } from '../../services/books.service';
import { IBook } from '../../models/book.model';

@Component({
  selector: 'app-book-popup',
  standalone: true,
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,

    MatIconButton,
    MatIcon,
    MatButton,
    MatDialogClose,

    BookFormComponent,
    BookInfoComponent,
  ],
})
export class BookPopupComponent {
  private booksService = inject(BooksService);

  public book = inject<Signal<IBook>>(MAT_DIALOG_DATA);
  public isEditMode = this.booksService.isEditMode;
}
