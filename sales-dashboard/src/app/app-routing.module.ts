import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectComponent } from "./object/object.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'object/:objectName/:objectId', component: ObjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
