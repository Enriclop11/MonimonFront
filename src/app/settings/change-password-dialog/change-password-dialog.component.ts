import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ApiMonitasService} from '../../service/api-monitas.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    FormsModule,
    MatButton,
    MatDialogTitle,
    MatDialogActions,
    NgIf
  ],
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  newPassword: string = "";
  confirmNewPassword: string | undefined;
  errrorMessage: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { token: string },
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private readonly apiMonitasService: ApiMonitasService
  ) {}

  changePassword(): void {
    if (this.newPassword === '') {
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.errrorMessage = 'Passwords do not match';
      return;
    }

    this.apiMonitasService.setPassword(this.data.token, this.newPassword).subscribe({
      next: () => {
        this.dialogRef.close()
      },
      error: () => {
        this.errrorMessage = 'Error changing password';
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
