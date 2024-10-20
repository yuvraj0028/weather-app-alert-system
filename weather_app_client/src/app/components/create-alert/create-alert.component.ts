import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-alert',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './create-alert.component.html',
  styleUrl: './create-alert.component.scss',
})
export class CreateAlertComponent {
  email: string = '';
  minTemp!: number;
  maxTemp!: number;

  private _snackBar = inject(MatSnackBar);
  imperialUnit: boolean = false;

  readonly data = inject<string>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<HeaderComponent>);
  location: string = this.data;

  onCreateClick() {
    // checking empty fields
    if (!this.email || !this.location || !this.minTemp || !this.maxTemp) {
      // snackbar
      this._snackBar.open('Please fill in all fields', 'Close');
      return;
    }

    // checking if minTemp is greater than maxTemp
    if (this.minTemp > this.maxTemp) {
      // snackbar
      this._snackBar.open(
        'Minimum temperature cannot be greater than maximum temperature',
        'Close'
      );
      return;
    }

    // regex to check if email is valid
    if (
      this.email.trim() === '' ||
      !this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      // snackbar
      this._snackBar.open('Please enter a valid email address', 'Close');
      return;
    }

    this.dialogRef.close({
      email: this.email.trim(),
      location: this.location,
      minTemp: this.minTemp,
      maxTemp: this.maxTemp,
      units: this.imperialUnit ? 'imperial' : 'metric',
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
