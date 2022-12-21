import { Type } from '@angular/core';
import {BaseObjectComponent} from "./base-object.component";

export class BaseObject {
  constructor(public component: Type<BaseObjectComponent>) {}
}
