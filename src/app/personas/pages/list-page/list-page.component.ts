import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from '../../interfaces/persona.interface';
import { PersonasService } from '../../services/persona.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-list-page',
  styleUrl: './list-page.component.css',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'rut', 'sexo', 'telefono', 'direccion', 'fec_nacimiento', 'email', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  public personas: Persona[] = [];

  constructor( private personaService: PersonasService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Persona>();
  }

  openDialog(persona:Persona) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        persona
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // Verificar si se aceptó el diálogo
        this.dataSource.data = this.dataSource.data.filter(persona2 => persona.id_persona !== persona2.id_persona);
        // Puedes llamar a this.ngOnInit() aquí si es necesario
      }
    });
  }

  ngOnInit(): void {
    this.personaService.getPersonas()
      .subscribe( personas  => {
        this.dataSource.data = personas;
      })
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

