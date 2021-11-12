import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from "../layout.service";
import {ObjectService} from "../object.service";
import {BaseObjectComponent} from "../base-object.component";

@Component({
  selector: 'app-object-creator',
  templateUrl: './object-creator.component.html',
  styleUrls: ['./object-creator.component.scss']
})
export class ObjectCreatorComponent implements BaseObjectComponent, OnInit {

  @Input() mode: string = '';
  @Input() objectName: string = '';
  @Input() object: any;
  @Input() layoutLoadedCallback: ((fields: any, values: any) => void) | undefined ;

  objectTitle: string = '';
  fields: any;
  values: any = {};

  constructor(
    private layoutService: LayoutService,
    private objectService: ObjectService
  ) {}

  ngOnInit(): void {
    this.objectTitle = this.objectName.charAt(0).toUpperCase() + this.objectName.slice(1);
    this.retrieveLayout(this.objectName);
  }

  retrieveLayout(objectName: string) {
    this.layoutService.retrieveLayout(objectName, 'edit').subscribe( layout => {
      this.fields = layout.fields;

      this.fields.forEach( (fieldName: string) => {
        this.values[fieldName] = this.mode === 'edit' ? this.object[fieldName] : null;
      });

      if (this.layoutLoadedCallback !== undefined) {
        this.layoutLoadedCallback(this.fields, this.values);
      }
    } );
  }

  createObject() {
    this.objectService.createObject(this.objectName, this.values).subscribe( creationResult => {
      alert(JSON.stringify(creationResult));
    } )
  }

  editObject() {
    this.objectService.editObject(this.objectName, this.object.id, this.values).subscribe( editResult => {
      alert(JSON.stringify(editResult));
    });
  }

}
