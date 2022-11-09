import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from "../layout.service";
import {ObjectService} from "../object.service";
import {BaseObjectComponent} from "../base-object.component";
import {catchError, of} from "rxjs";
import {ToastService} from "../service/toast.service";
import {ObjectUtils} from "../utils/object.utils";

@Component({
  selector: 'app-object-creator',
  templateUrl: './object-creator.component.html',
  styleUrls: ['./object-creator.component.scss']
})
export class ObjectCreatorComponent implements BaseObjectComponent, OnInit {

  @Input() mode: string = '';
  @Input() objectName: string = '';
  @Input() objectId: string = '';
  @Input() object: any;
  @Input() layoutLoadedCallback: ((dataObject: any) => void) | undefined ;
  @Input() afterResponse: ((response: any) => void) | undefined;

  objectTitle: string = '';
  fields: any;
  values: any = {};

  dataObject: any = {};

  layoutSections: any;
  layoutFields: any;

  constructor(
    private layoutService: LayoutService,
    private objectService: ObjectService,
    private toastService: ToastService,

    private objectUtils: ObjectUtils
  ) {}

  ngOnInit(): void {
    this.objectTitle = this.objectName.charAt(0).toUpperCase() + this.objectName.slice(1);
    this.retrieveData(this.objectName, this.mode == 'edit' ? this.objectId : 'none');
  }

  //TODO retrieve record type mapping
  retrieveData(objectName: string, objectId: string) {
    this.objectService.retrieveObject(objectName, objectId).subscribe( object => {
      this.layoutService.retrieveLayout(objectName, 'default', 'edit').subscribe( layout => {
        this.object = object;
        this.dataObject = this.objectUtils.getObjectFromLayout(this.object, layout);

        this.layoutSections = Object.keys(layout);
        this.layoutFields = layout;

        if (this.layoutLoadedCallback !== undefined) {
          this.layoutLoadedCallback(this.dataObject);
        }
      } );
    } )
  }

  createObject() {
    this.objectService.createObject(this.objectName, this.dataObject)
      .subscribe(
        creationResult => {

          this.toastService.showToast('success', `Record has been created.`);
          if (this.afterResponse != undefined) {
            this.afterResponse(creationResult);
          }
        },

        err => {

          const errorMessage = err.error?.error != null ? err.error.error : 'An error occurred.';
          this.toastService.showToast('error', errorMessage);
        });
  }

  editObject() {
    this.objectService.editObject(this.objectName, this.objectId, this.dataObject)
      .subscribe(
        creationResult => {

          this.toastService.showToast('success', `Record has been updated.`);
          if (this.afterResponse != undefined) {
            this.afterResponse(creationResult);
          }
        },

        err => {
          console.log(err);

          const errorMessage = err.error?.error != null ? err.error.error : 'An error occurred.';
          this.toastService.showToast('error', errorMessage);
        });
  }

}
