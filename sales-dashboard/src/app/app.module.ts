import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ObjectComponent} from "./dashboard/component/objects/object/object.component";
import {ObjectComponentService} from "./dashboard/service/object-component/object-component.service";
import {AccountComponent} from "./package/testPackage/component/account/account.component";
import {ObjectDirective} from "./dashboard/directives/object.directive";
import {HttpClientModule} from "@angular/common/http";
import { TopbarComponent } from './dashboard/component/general/topbar/topbar.component';
import { HomeComponent } from './dashboard/component/general/home/home.component';
import { ObjectListComponent } from './dashboard/component/objects/object-list/object-list.component';
import { ObjectModalComponent } from './dashboard/component/objects/object-modal/object-modal.component';
import { ObjectCreatorComponent } from './dashboard/component/objects/object-creator/object-creator.component';
import {ModalComponentDirective} from "./dashboard/directives/modal-component.directive";
import { PromptComponent } from './dashboard/component/util/prompt/prompt.component';
import { RelationsComponent } from './dashboard/component/objects/relations/relations.component';
import { LoginComponent } from './dashboard/component/general/login/login.component';
import {CanActivateLoginUser} from "./dashboard/guard/CanActivateLoginUser";
import { ClientComponent } from './package/testPackage/component/client/client.component';
import { TextComponent } from './dashboard/component/fields/text/text.component';
import { RelationComponent } from './dashboard/component/fields/relation/relation.component';
import { EditTextComponent } from './dashboard/component/input/edit-text/edit-text.component';
import { EditRelationComponent } from './dashboard/component/input/edit-relation/edit-relation.component';
import { ToastComponent } from './dashboard/component/util/toast/toast.component';
import { PathComponent } from './dashboard/component/general/path/path.component';
import { OpportunityComponent } from './package/testPackage/component/opportunity/opportunity.component';
import { ContractComponent } from './package/testPackage/component/contract/contract/contract.component';
import { InputDirective } from './dashboard/directives/input.directive';
import { FieldComponent } from './dashboard/component/fields/field/field.component';
import { FieldDirective } from './dashboard/directives/field.directive';
import { InputComponent } from './dashboard/component/input/input/input.component';
import { SearchComponent } from './dashboard/component/general/search/search.component';
import { CreateQuoteComponent } from './package/testPackage/component/create-quote/create-quote.component';
import { SpinnerComponent } from './dashboard/component/general/spinner/spinner.component';
import { CreateContractComponent } from './package/testPackage/component/create-contract/create-contract.component';
import { ObjectMenuComponent } from './dashboard/component/objects/object-menu/object-menu.component';
import { AutoFocusInputDirective } from './dashboard/directives/auto-focus-input.directive';

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
    ClientComponent,
    TextComponent,
    RelationComponent,
    EditTextComponent,
    EditRelationComponent,
    ToastComponent,
    PathComponent,
    OpportunityComponent,
    ContractComponent,
    InputDirective,
    FieldComponent,
    FieldDirective,
    InputComponent,
    SearchComponent,
    CreateQuoteComponent,
    SpinnerComponent,
    CreateContractComponent,
    ObjectMenuComponent,
    AutoFocusInputDirective
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
