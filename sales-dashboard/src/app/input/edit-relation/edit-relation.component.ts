import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditField} from "../edit-field";

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.scss']
})
export class EditRelationComponent implements OnInit, EditField {

  @Input() fieldData: any;
  @Input() values: any;

  @Output() interact = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(text: any): void {
    const fieldName = this.fieldData.field;
    this.values[fieldName] = text;
  }
}
