import {Component, Input, OnInit} from '@angular/core';
import {Field} from "../field";

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit, Field {

  @Input() fieldData: any;
  @Input() fieldValue: any;

  constructor() { }

  ngOnInit(): void {
  }
}
