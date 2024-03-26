import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonasRoutingModule } from './personas-routing.module';
import { PersonaPageComponent } from './pages/persona-page/persona-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddPersonaPageComponent } from './pages/add-persona-page/add-persona-page.component';
import { UpdatePersonaPageComponent } from './pages/update-persona-page/update-persona-page.component';
import { MaterialModule } from '../material/material.module';
import { SexoTransformPipe } from './pipes/sexTransform.pipe';
import { RutPipe } from './pipes/rutTransform.pipe';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    PersonaPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    AddPersonaPageComponent,
    UpdatePersonaPageComponent,
    SexoTransformPipe,
    RutPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
