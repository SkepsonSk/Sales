import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RelationsService} from "../service/relations.service";

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss']
})
export class RelationsComponent implements OnInit {

  @Input() objectName: string = '';
  @Input() relationName: string = '';
  @Input() objectId: string = '';

  @Output() clicked = new EventEmitter<any>();

  relationTitle: string = '';
  relationRecords: any;
  relationFields: any;
  relationObjectName: string = '';
  relatedField: string = '';
  fieldWidth: number = 0;

  constructor(
    private relationService: RelationsService
  ) {}

  ngOnInit(): void {
    this.relationService.retrieveObjects(
      this.objectName,
      this.relationName,
      this.objectId)
      .subscribe( relation => {

        this.relationTitle = relation.title;
        this.relationRecords = relation.results;
        this.relationFields = relation.fields;
        this.relationObjectName = relation.objectName;
        this.relatedField = relation.relatedField;
        this.fieldWidth = 100/relation.fields.length;
    } );
  }

  fireClickNewEvent(): void {
    const clickBody = { type: 'new', objectName: this.relationObjectName, relatedField: this.relatedField};
    this.clicked.emit(clickBody);
  }

  fireClickEditEvent(object: any): void {
    const clickBody = { type: 'edit', objectName: this.relationObjectName, objectId: object.Id};
    this.clicked.emit(clickBody);
  }

  fireClickDeleteEvent(object: any): void {
    const clickBody = { type: 'delete', objectName: this.relationObjectName, objectId: object.Id};
    this.clicked.emit(clickBody);
  }
}
