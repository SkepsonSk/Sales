import { Injectable } from '@angular/core';
import {BaseEditField} from "../../component/input/base-edit-field";

@Injectable({
  providedIn: 'root'
})
export class InputService {

  components: Map<string, BaseEditField>

  constructor() {
    this.components = new Map<string, BaseEditField>();
  }

  registerComponent(componentName: string, field: BaseEditField){
    this.components.set(componentName, field);
  }

  getComponent(componentName: string | null): BaseEditField {
    return <BaseEditField>this.components.get(<string>componentName);
  }
}
