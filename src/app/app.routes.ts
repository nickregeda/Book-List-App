import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'books', loadComponent: () => import('./pages/books/books.component').then((c) => c.BooksComponent) },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books', pathMatch: 'full' },
];
