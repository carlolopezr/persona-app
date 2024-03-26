import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { NavbarPageComponent } from './pages/navbar-page/navbar-page.component';
import { MaterialModule } from '../material/material.module';
import { PersonasRoutingModule } from '../personas/personas-routing.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    NavbarPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PersonasRoutingModule
  ],
  exports: [
    Error404PageComponent,
    NavbarPageComponent
  ]
})
export class SharedModule { }
