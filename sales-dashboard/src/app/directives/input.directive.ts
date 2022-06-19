import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
