import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent implements OnInit {

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
