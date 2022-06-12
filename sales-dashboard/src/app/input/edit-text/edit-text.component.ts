import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditField} from "../edit-field";

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent implements OnInit, EditField {

  @Input() fieldData: any;
  @Input() values: any;

  @Output() interact = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

  handleChange(text: any): void {
    const fieldName = this.fieldData.field;
    this.values[fieldName] = text;
  }
}
