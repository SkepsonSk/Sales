import { Component } from '@angular/core';
import {ObjectComponentService} from "./object-component.service";
import {BaseObject} from "./base-object";
import {ModalService} from "./modal-service.service";
import {ObjectCreatorComponent} from "./object-creator/object-creator.component";
import {PromptComponent} from "./prompt/prompt.component";
import {AuthService} from "./service/auth.service";
import {OpportunityComponent} from "./components/opportunity/opportunity/opportunity.component";
import {ContractComponent} from "./components/contract/contract/contract.component";
import {FieldService} from "./service/field.service";
import {TextComponent} from "./fields/text/text.component";
import {BaseField} from "./fields/base-field";
import {RelationComponent} from "./fields/relation/relation.component";
import {InputService} from "./service/input.service";
import {EditTextComponent} from "./input/edit-text/edit-text.component";
import {BaseEditField} from "./input/base-edit-field";
import {EditRelationComponent} from "./input/edit-relation/edit-relation.component";
import {CreateQuoteComponent} from "./components/account/create-quote/create-quote.component";
import {CreateContractComponent} from "./components/opportunity/create-contract/create-contract.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'sales-dashboard';

  modalVisible = false;
  modalComponentName = '';
  modalData: any = null;
  componentInstantiateCallback: ((instance: any) => void) | undefined;

  constructor(
    private authService: AuthService,
    private objectComponentService: ObjectComponentService,
    private fieldService: FieldService,
    private inputService: InputService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.objectComponentService.registerComponent('object-creator', new BaseObject(ObjectCreatorComponent));
    this.objectComponentService.registerComponent('prompt', new BaseObject(PromptComponent));
    this.objectComponentService.registerComponent('opportunity', new BaseObject(OpportunityComponent));
    this.objectComponentService.registerComponent('contract', new BaseObject(ContractComponent));
    this.objectComponentService.registerComponent('createQuote', new BaseObject(CreateQuoteComponent));
    this.objectComponentService.registerComponent('createContract', new BaseObject(CreateContractComponent));

    this.fieldService.registerComponent('text', new BaseField(TextComponent));
    this.fieldService.registerComponent('relation', new BaseField(RelationComponent));

    this.inputService.registerComponent('text', new BaseEditField(EditTextComponent));
    this.inputService.registerComponent('relation', new BaseEditField(EditRelationComponent));

    this.modalService.getData().subscribe( modalData => {
      if (modalData.modalVisible) {
        this.modalVisible = true;
        this.modalComponentName = modalData.modalComponentName;
        this.modalData = modalData.data;
        this.componentInstantiateCallback = modalData.componentInstantiateCallback;
      }
      else {
        this.closeModal();
      }
    } );
  }

  isAuthenticated() : boolean {
    return this.authService.isAuthenticated();
  }

  closeModal() {
    this.modalData = null;
    this.modalVisible = false;
  }
}
