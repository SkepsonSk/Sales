import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit {

  @Input() field: any;
  @Input() value: string = '';
  @Input() relationObjectId: string = '';
  @Input() relatedTo: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
