import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FieldDirective} from "../../directives/field.directive";
import {Field} from "../field";
import {FieldService} from "../../service/field.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() fieldData: any;
  @Input() fieldValue: any;

  @ViewChild(FieldDirective, {static: true}) appInput!: FieldDirective;

  constructor(
    private fieldService: FieldService
  ) {}

  ngOnInit(): void {
    this.loadField();
  }

  loadField(): void {
    const fieldBase = this.fieldService.getComponent(this.fieldData.type);

    const viewContainerRef = this.appInput.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Field>(fieldBase.component);
    componentRef.instance.fieldData = this.fieldData;
    componentRef.instance.fieldValue = this.fieldValue;
  }
}
