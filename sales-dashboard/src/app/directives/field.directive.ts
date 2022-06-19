import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appField]'
})
export class FieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
