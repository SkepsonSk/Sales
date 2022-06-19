import { Injectable } from '@angular/core';
import {BaseField} from "../fields/base-field";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  components: Map<string, BaseField>

  constructor() {
    this.components = new Map<string, BaseField>();
  }

  registerComponent(componentName: string, field: BaseField){
    this.components.set(componentName, field);
  }

  getComponent(componentName: string | null): BaseField {
    return <BaseField>this.components.get(<string>componentName);
  }
}
