import { Provider } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

const snackbarConfig: MatSnackBarConfig = {
  duration: 2000,
  verticalPosition: 'bottom',
  horizontalPosition: 'right',
};

export const snackbarProvider: Provider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: snackbarConfig,
};
