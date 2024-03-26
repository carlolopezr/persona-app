import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { AddPersonaPageComponent } from "./pages/add-persona-page/add-persona-page.component";
import { UpdatePersonaPageComponent } from "./pages/update-persona-page/update-persona-page.component";
import { ListPageComponent } from "./pages/list-page/list-page.component";
import { PersonaPageComponent } from "./pages/persona-page/persona-page.component";

const routes: Routes = [
  {
    path:'',
    component: ListPageComponent,
  },
  { path: 'add-persona', component: AddPersonaPageComponent},
  { path: 'update-persona/:id',component: UpdatePersonaPageComponent },
  { path: ':id', component: PersonaPageComponent },
  { path: '**', redirectTo: 'personas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule {}
