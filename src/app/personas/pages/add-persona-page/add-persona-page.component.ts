import {Component, OnInit} from '@angular/core';
import { Comuna, Persona, Region } from '../../interfaces/persona.interface';
import { PersonasService } from '../../services/persona.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fechaMenorActualValidator, telValidator, validarRut } from '../../../shared/validators/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-persona-page',
  templateUrl: './add-persona-page.component.html',
  styleUrl: './add-persona-page.component.css',
  providers:[provideNativeDateAdapter()]
})
export class AddPersonaPageComponent implements OnInit{


  public regiones: Region[] = [];
  public comunas: Comuna[] = [];
  selectedRegionId: number | null = null;
  public comunasFiltradas: Comuna[] = [];
  public personas: Persona[] = [];

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚÜáéíóúüñÑ]+$')]],
    apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚÜáéíóúüñÑ]+$')]],
    telefono: ['', [Validators.required, telValidator]],
    direccion: ['', [Validators.required]],
    region: ['', [Validators.required]],
    id_comuna: [0, [Validators.required]],
    fec_nacimiento: [new Date(2000,2,20), [Validators.required, fechaMenorActualValidator]],
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    rut:['', [Validators.required, validarRut]],
    sexo:['0', [Validators.required]],
    id_referencia: ['']
  })


  constructor(private personaService: PersonasService, private fb : FormBuilder,
    private snackBar: MatSnackBar, private router: Router) {

  }

  ngOnInit() : void {
    this.personaService.getPersonas().subscribe(personas => this.personas = personas)
    this.personaService.getRegiones().subscribe(regiones => this.regiones = regiones)
    this.personaService.getComunas().subscribe(comunas => this.comunas = comunas)

  }

  // Función para filtrar las comunas según la región seleccionada
  onRegionChange(regionId: number | null) {
    // Filtrar las comunas relacionadas con la región seleccionada
    if (regionId) {
      this.comunasFiltradas = this.comunas.filter(comuna => comuna.id_region === regionId);
    } else {
      this.comunasFiltradas = []; // Reiniciar las comunas filtradas si no hay región seleccionada
    }
  }

  isValidField( field:string ) : boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  // Formulario
  onSubmit() {
    this.myForm.markAllAsTouched();


    if (this.myForm.valid) {

      console.log(this.myForm.value);

      this.personaService.postPersona(this.myForm.value).subscribe(msg => {
        this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        this.myForm.reset();

        this.router.navigateByUrl('/personas');

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
      )
    }
  }
}
