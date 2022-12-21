import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectComponent } from "./dashboard/component/objects/object/object.component";
import {HomeComponent} from "./dashboard/component/general/home/home.component";
import {ObjectListComponent} from "./dashboard/component/objects/object-list/object-list.component";
import {CanActivateLoginUser} from "./dashboard/guard/CanActivateLoginUser";
import {LoginComponent} from "./dashboard/component/general/login/login.component";
import {SearchComponent} from "./dashboard/component/general/search/search.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [CanActivateLoginUser]},
  { path: 'object/:objectName', component: ObjectListComponent, canActivate: [CanActivateLoginUser] },
  { path: 'object/:objectName/:objectId', component: ObjectComponent, canActivate: [CanActivateLoginUser] },
  { path: 'search', component: SearchComponent, canActivate: [CanActivateLoginUser]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
