import { Type } from '@angular/core';
import {EditField} from "./edit-field";

export class BaseEditField {
  constructor(public component: Type<EditField>) {}
}
