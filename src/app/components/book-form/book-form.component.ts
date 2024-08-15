import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';

import { BOOK_FORM_ELEMENTS } from './book-form';
import { IBook } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
})
export class BookFormComponent implements OnInit {
  public book = input.required<IBook>();

  private fb = inject(FormBuilder);
  private matSnackBar = inject(MatSnackBar);
  private booksService = inject(BooksService);

  public bookFormEls = BOOK_FORM_ELEMENTS;
  public bookForm: FormGroup;

  ngOnInit() {
    const {
      title,
      author,
      publishedYear,
      genre,
      publisher,
      language,
      description,
    } = this.book();

    this.bookForm = this.fb.group({
      title: [ title, Validators.required ],
      author: [ author, Validators.required ],
      publishedYear: [ publishedYear, Validators.required ],
      genre: [ genre, Validators.required ],
      publisher: [ publisher, Validators.required ],
      language: [ language, Validators.required ],

      description: [ description ],
    });
  }

  public get isFormChanged(): boolean {
    return this.bookForm.dirty;
  }

  public disableEditMode(): void {
    this.booksService.toggleEditMode(false);
  }

  public saveBook(): void {
    const updatedBook: IBook = {
      ...this.book(),
      ...this.bookForm.value,
    }

    this.booksService.updateBook(updatedBook);
    this.matSnackBar.open("Book's info updated!", "OK");
    this.disableEditMode();
  }
}
