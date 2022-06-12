import {Component, Input, OnInit} from '@angular/core';
import {Field} from "../field";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, Field {

  @Input() fieldData: any;
  @Input() fieldValue: any;

  constructor() { }

  ngOnInit(): void {}
}
