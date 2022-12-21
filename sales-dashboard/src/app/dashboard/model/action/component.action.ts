import {Action} from "./action";
import {ModalService} from "../../service/modal/modal-service.service";

export class ComponentAction extends Action {
  private modalService: ModalService;

  constructor(
    modalService: ModalService
  ) {
    super();
    this.modalService = modalService;
  }

  override handle(data: any, objectName: string, objectId: string): boolean {
    console.log('Running...');
    const componentName = data.component;
    this.modalService.openModal(componentName, {}, instance => {
      instance.objectName = objectName;
      instance.objectId = objectId;
    });

    return true;
  }
}
