import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.scss']
})
export class EditRelationComponent implements OnInit {

  @Input() fieldData: any;
  @Input() values: any;

  @Output() interact = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleChange(text: any): void {
    const emitterBody = { text: text};
    this.interact.emit(emitterBody);
  }
}
