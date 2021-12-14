import { Component } from '@angular/core';
import {ObjectComponentService} from "./object-component.service";
import {AccountComponent} from "./account/account.component";
import {BaseObject} from "./base-object";
import {ModalService} from "./modal-service.service";
import {ObjectCreatorComponent} from "./object-creator/object-creator.component";
import {PromptComponent} from "./prompt/prompt.component";
import {AuthService} from "./service/auth.service";
import {ClientComponent} from "./components/client/client/client.component";

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
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.objectComponentService.registerComponent('object-creator', new BaseObject(ObjectCreatorComponent));
    this.objectComponentService.registerComponent('prompt', new BaseObject(PromptComponent));
    this.objectComponentService.registerComponent('account', new BaseObject(AccountComponent));
    this.objectComponentService.registerComponent('client', new BaseObject(ClientComponent));

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
