import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObjectComponent} from "./object/object.component";

const routes: Routes = [
  { path: 'object/:objectName', component: ObjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
