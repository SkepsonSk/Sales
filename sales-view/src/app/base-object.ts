import { Type } from '@angular/core';

export class BaseObject {
  constructor(public component: Type<any>) {}
}
