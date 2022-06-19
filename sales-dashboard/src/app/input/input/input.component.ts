import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InputDirective} from "../../directives/input.directive";
import {InputService} from "../../service/input.service";
import {EditField} from "../edit-field";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() fieldData: any;
  @Input() values: any;

  @ViewChild(InputDirective, {static: true}) appInput!: InputDirective;

  constructor(
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.loadField();
  }

  loadField(): void {
    const fieldBase = this.inputService.getComponent(this.fieldData.type);

    const viewContainerRef = this.appInput.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<EditField>(fieldBase.component);
    componentRef.instance.fieldData = this.fieldData;
    componentRef.instance.values = this.values;
  }

}
