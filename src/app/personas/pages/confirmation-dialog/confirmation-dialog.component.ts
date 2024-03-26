import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonasService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private personaService: PersonasService,
    private snackBar: MatSnackBar,
  ) { }


  onDelete (id:number) {

    this.personaService.deletePersona(id).subscribe(msg => {
      this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
    ,
    error => {
      this.snackBar.open('Error al eliminar a la persona', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
