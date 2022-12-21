import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EditField} from "../edit-field";
import {ObjectService} from "../../../service/object/object.service";

@Component({
  selector: 'app-edit-relation',
  templateUrl: './edit-relation.component.html',
  styleUrls: ['./edit-relation.component.scss']
})
export class EditRelationComponent implements OnInit, EditField {

  @Input() fieldData: any;
  @Input() values: any;

  @Output() interact = new EventEmitter<any>();

  displayedRelatedObjectName: string = '';
  searchResults: any;

  constructor(
    private objectService: ObjectService
  ) { }

  ngOnInit(): void {
    this.retrieveRelatedObjectData();
  }

  retrieveRelatedObjectData() {
    const relatedObject = this.fieldData.related;
    const relatedId = this.values[this.fieldData.field]

    this.objectService.retrieveObjectFields(relatedObject, relatedId, ['name'])
      .subscribe( relatedData => {
        this.displayedRelatedObjectName = relatedData.name;
      } );
  }

  retrieveSearchedObjectData(searchText: string) {
    console.log('Searching...');
    this.objectService.listObjects(this.fieldData.related, `name LIKE '${searchText}%'`)
      .subscribe( searchResults => {
        this.searchResults = searchResults;
        console.log(this.searchResults.length);
      } )
  }

  handleReset(): void {
    setTimeout( () => this.searchResults = [], 200 );
  }

  handleChange(text: any): void {
    this.retrieveSearchedObjectData(text);
  }

  handleSelect(searchResult: any, event: any): void {
    event.stopPropagation();
    console.log(searchResult.id);
    this.displayedRelatedObjectName = searchResult.name;
    const fieldName = this.fieldData.field;
    this.values[fieldName] = searchResult.id;
  }
}
