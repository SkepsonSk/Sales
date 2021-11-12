import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalComponent]',
})
export class ModalComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
