import { Type } from '@angular/core';
import {Field} from "./field";

export class BaseField {
  constructor(public component: Type<Field>) {}
}
