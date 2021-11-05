import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ObjectComponent} from "./object/object.component";
import {ObjectComponentService} from "./object-component.service";
import {AccountComponent} from "./account/account.component";
import {ObjectDirective} from "./object.directive";
import {HttpClientModule} from "@angular/common/http";
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    AccountComponent,
    ObjectDirective,
    TopbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ObjectComponentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
