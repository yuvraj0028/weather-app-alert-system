import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';
import { UserAlertsComponent } from '../user-alerts/user-alerts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trigger-alert',
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
  templateUrl: './trigger-alert.component.html',
  styleUrl: './trigger-alert.component.scss',
})
export class TriggerAlertComponent {
  private _snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<UserAlertsComponent>);
  email!: string;

  onTriggerClick() {
    // regex to check if email is valid
    if (
      this.email === null ||
      this.email === undefined ||
      this.email.trim() === '' ||
      !this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      // snackbar
      this._snackBar.open('Please enter a valid email address', 'Close');
      return;
    }

    this.dialogRef.close({
      email: this.email,
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
