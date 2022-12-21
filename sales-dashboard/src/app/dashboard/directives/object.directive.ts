import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[objectManagement]',
})
export class ObjectDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
