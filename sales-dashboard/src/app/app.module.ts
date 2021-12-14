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
import { ObjectListComponent } from './object-list/object-list.component';
import { ObjectModalComponent } from './object-modal/object-modal.component';
import { ObjectCreatorComponent } from './object-creator/object-creator.component';
import {ModalComponentDirective} from "./directives/modal-component.directive";
import { PromptComponent } from './prompt/prompt.component';
import { RelationsComponent } from './relations/relations.component';
import { LoginComponent } from './login/login.component';
import {CanActivateLoginUser} from "./guard/CanActivateLoginUser";
import { ClientComponent } from './components/client/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectComponent,
    AccountComponent,
    ObjectDirective,
    ModalComponentDirective,
    TopbarComponent,
    HomeComponent,
    ObjectListComponent,
    ObjectModalComponent,
    ObjectCreatorComponent,
    PromptComponent,
    RelationsComponent,
    LoginComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ObjectComponentService,
    CanActivateLoginUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
