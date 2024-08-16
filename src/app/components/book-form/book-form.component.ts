import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
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
  public book = input<IBook>();

  private fb = inject(FormBuilder);
  private matSnackBar = inject(MatSnackBar);
  private matDialogRef = inject(MatDialogRef);
  private booksService = inject(BooksService);

  private isAddBookPopup = computed(() => !this.book());
  private coverImage: string;

  public bookFormEls = BOOK_FORM_ELEMENTS;
  public bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: [ this.book()?.title || '', Validators.required ],
      author: [ this.book()?.author || '', Validators.required ],
      publishedYear: [ this.book()?.publishedYear || null, Validators.required ],
      genre: [ this.book()?.genre || '', Validators.required ],
      publisher: [ this.book()?.publisher || '', Validators.required ],
      language: [ this.book()?.language || '', Validators.required ],
      description: [ this.book()?.description || '' ],
    });
  }

  private closePopup(): void {
    this.matDialogRef.close();
  }

  private disableEditMode(): void {
    this.booksService.toggleEditMode(false);
  }

  private updateBook(): void {
    const updatedBook: IBook = {
      ...this.book(),
      ...this.bookForm.value,
    }

    this.booksService.updateBook(updatedBook);
    this.matSnackBar.open("Book's info updated!", "OK");
    this.disableEditMode();
  }

  private addBook(): void {
    const newBook: Omit<IBook, 'id'> = {
      ...this.bookForm.value,
      coverImageUrl: this.coverImage,
    };

    this.booksService.createBook(newBook);
    this.matSnackBar.open(`Book ${ newBook.title } created!`, "OK");
    this.closePopup();
  }

  public get disabled(): boolean {
    if (this.isAddBookPopup()) {
      return this.bookForm.invalid;
    } else {
      return !this.bookForm.dirty;
    }
  }

  public onImageUpload(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.files?.length) {
      const file = inputEl.files[0];
      const reader = new FileReader();

      reader.onload = () => this.coverImage = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  public cancel(): void {
    if (this.isAddBookPopup()) {
      this.closePopup();
    } else {
      this.disableEditMode();
    }
  }

  public submit(): void {
    if (this.isAddBookPopup()) {
      this.addBook();
    } else {
      this.updateBook();
    }
  }
}
