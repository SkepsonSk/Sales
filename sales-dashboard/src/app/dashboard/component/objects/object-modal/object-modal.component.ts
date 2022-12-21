import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalComponentDirective} from "../../../directives/modal-component.directive";
import {ObjectComponentService} from "../../../service/object-component/object-component.service";
import {BaseObjectComponent} from "../../../model/base-object.component";

@Component({
  selector: 'app-object-modal',
  templateUrl: './object-modal.component.html',
  styleUrls: ['./object-modal.component.scss']
})
export class ObjectModalComponent implements OnInit {

  @Input() modalComponentName : string = '';
  @Input() data: any;
  @Input() componentInstantiateCallback : ((instance: any) => void) | undefined;

  @ViewChild(ModalComponentDirective, {static: true})
  modalComponent!: ModalComponentDirective

  constructor(
    private objectComponentService : ObjectComponentService
  ) {}

  ngOnInit(): void {
    this.loadComponent(this.modalComponentName);
  }

  loadComponent(componentName: string) {
    const componentType = this.objectComponentService.getComponent(componentName);
    const component = this.modalComponent.viewContainerRef.createComponent<BaseObjectComponent>(componentType.component);

    if (this.componentInstantiateCallback !== undefined && this.componentInstantiateCallback !== null) {
      this.componentInstantiateCallback(component.instance);
    }
  }

}
