// src/app/confirmation-dialog/confirmation-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close(true); // Close dialog and return true for confirmation
  }

  cancel(): void {
    this.dialogRef.close(false); // Close dialog and return false for cancellation
  }
}
