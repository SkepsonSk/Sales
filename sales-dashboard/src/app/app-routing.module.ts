import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectComponent } from "./object/object.component";
import {HomeComponent} from "./home/home.component";
import {ObjectListComponent} from "./object-list/object-list.component";
import {CanActivateLoginUser} from "./guard/CanActivateLoginUser";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [CanActivateLoginUser]},
  { path: 'object/:objectName', component: ObjectListComponent, canActivate: [CanActivateLoginUser] },
  { path: 'object/:objectName/:objectId', component: ObjectComponent, canActivate: [CanActivateLoginUser] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
