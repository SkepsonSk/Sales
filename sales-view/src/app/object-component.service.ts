import {Injectable} from "@angular/core";
import {BaseObject} from "./base-object";

@Injectable()
export class ObjectComponentService {

  components: Map<string, BaseObject>

  constructor() {
    this.components = new Map<string, BaseObject>();
  }

  registerComponent(componentName: string, baseObject: BaseObject){
    this.components.set(componentName, baseObject);
  }

  getComponent(componentName: string): BaseObject {
    return <BaseObject>this.components.get(componentName);
  }

}
