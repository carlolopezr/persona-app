import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fechaMenorActualValidator, telValidator, validarRut } from '../../../shared/validators/validators';
import { PersonasService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comuna, Persona, Referencia, Region } from '../../interfaces/persona.interface';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-persona-page',
  templateUrl: './update-persona-page.component.html',
  styleUrl: './update-persona-page.component.css',
  providers:[provideNativeDateAdapter()]
})
export class UpdatePersonaPageComponent implements OnInit {

  public id: string | null;
  public persona:Persona | null = null
  public regiones: Region[] = [];
  public comunas: Comuna[] = [];
  selectedRegionId!: number | undefined;
  selectedComunaId! : number | undefined;
  public comunasFiltradas: Comuna[] = [];
  public personas: Persona[] = [];
  public regionPersona: Region | undefined
  public comunaPersona!: Comuna | undefined
  public referencias: Referencia[] = [];
  public personasReferencias: Persona[] = [];

  displayedColumns: string[] = ['nombre', 'apellido', 'rut', 'sexo', 'telefono', 'direccion', 'fec_nacimiento', 'email'];
  dataSource: MatTableDataSource<Persona>;

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    telefono: ['', [Validators.required, telValidator]],
    direccion: ['', [Validators.required]],
    region: ['', [Validators.required]],
    id_comuna: [0, [Validators.required]],
    fec_nacimiento: [new Date(2000,2,20), [Validators.required, fechaMenorActualValidator]],
    sexo:['0', [Validators.required]],
  })

  constructor(private personaService: PersonasService, private fb : FormBuilder,
    private snackBar: MatSnackBar, private route : ActivatedRoute, public dialog: MatDialog) {

      this.id = this.route.snapshot.paramMap.get('id')
      this.dataSource = new MatTableDataSource<Persona>();
  }

  ngOnInit(): void {

    this.personaService.getPersonas().subscribe(personas => {

      this.personaService.getReferencias(this.id).subscribe(referencias => {

        console.log(referencias);
        console.log(personas);


        this.personaService.getRegiones().subscribe(regiones => {
          this.regiones = regiones;

          this.personaService.getComunas().subscribe(comunas => {
            this.comunas = comunas;

            this.personaService.getPersona(this.id).subscribe(persona => {
              if (!persona) return;

              this.personasReferencias = personas.filter(persona2 =>
                referencias.some(ref =>

                  (persona2.id_persona === ref.persona_id || persona2.id_persona === ref.persona_referenciada_id)
                  && persona2.id_persona != persona.id_persona
                )
              );

              this.persona = persona;
              this.comunaPersona = this.comunas.find(comuna => persona.id_comuna === comuna.id_comuna);
              this.regionPersona = this.regiones.find(region => region.id_region === this.comunaPersona?.id_region);
              this.selectedRegionId = this.regionPersona?.id_region
              this.selectedComunaId = this.comunaPersona?.id_comuna

              this.onRegionChange(this.selectedRegionId)

              // Asignar los valores al formulario
              this.myForm.reset({
                nombre: persona.nombre,
                apellido: persona.apellido,
                telefono: persona.telefono.toString(),
                direccion: persona.direccion,
                fec_nacimiento: new Date(persona.fec_nacimiento),
                sexo: persona.sexo.toString(),
                region: this.regionPersona?.id_region,
                id_comuna: this.comunaPersona?.id_comuna,
              });
            });
          });
        });
      });
    })
  }


  // Función para filtrar las comunas según la región seleccionada
  onRegionChange(regionId: number | undefined) {
    // Filtrar las comunas relacionadas con la región seleccionada
    if (regionId) {
      this.comunasFiltradas = this.comunas.filter(comuna => comuna.id_region === regionId);
    } else {
      this.comunasFiltradas = []; // Reiniciar las comunas filtradas si no hay región seleccionada
    }
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

  isValidField( field:string ) : boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.myForm.valid) {

      console.log(this.myForm.value);

      this.myForm.value.id_persona = this.persona?.id_persona
      this.personaService.putPersona(this.myForm.value).subscribe( msg => {
        this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },

      error => {
        console.log(error);

        let errorMessage = 'Error desconocido';
        if (error.error.msg) {
          errorMessage = error.error.msg;
        }
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
      )}
  }
}
