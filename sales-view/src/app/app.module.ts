import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectComponent } from './object/object.component';
import { HttpClientModule } from "@angular/common/http";
import { AccountComponent } from './account/account.component';
import {ObjectDirective} from "./object.directive";
import {ObjectComponentService} from "./object-component.service";

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    AccountComponent,
    ObjectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ObjectComponentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
