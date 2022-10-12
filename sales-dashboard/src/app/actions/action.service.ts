import { Injectable } from '@angular/core';
import {Action} from "./action";
import {ComponentAction} from "./component.action";
import {ModalService} from "../modal-service.service";
import {UrlAction} from "./url.action";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  actionTypes: Map<string, Action>

  constructor(
    private modalService: ModalService
  ) {
    this.actionTypes = new Map<string, Action>();
    this.initialize();
  }

  private initialize() {
    this.actionTypes.set('component', new ComponentAction(this.modalService));
    this.actionTypes.set('url', new UrlAction());
  }

  public getActionType(actionType: string): Action | undefined {
    return this.actionTypes.get(actionType);
  }
}
