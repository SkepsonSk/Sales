import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ObjectDirective} from "../object.directive";
import {ObjectService} from "../object.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ObjectComponentService} from "../object-component.service";
import {BaseObjectComponent} from "../base-object.component";
import {ModalService} from "../modal-service.service";
import {RelationsService} from "../service/relations.service";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  objectName: string = '';
  object: any;
  objectFields: any;
  objectId: string = '';

  relations: any;

  @ViewChild(ObjectDirective, {static: true})
  objectManagement!: ObjectDirective

  constructor(
    private objectService: ObjectService,
    private relationService: RelationsService,
    private objectComponentService: ObjectComponentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      this.objectName = <string>params.get('objectName');
      this.objectId = <string>params.get('objectId');

      const obj = this.objectComponentService.getComponent(this.objectName);
      if (obj != null) {
        this.objectManagement.viewContainerRef.createComponent<BaseObjectComponent>(obj.component);
      }

      this.retrieveObject(this.objectName, this.objectId);
      this.retrieveRelations(<string>this.objectName);
    } );
  }

  retrieveObject(objectName: string | null, objectId: string | null): void {
    this.objectService.retrieveObject(<string>objectName, <string>objectId).subscribe( obj => {
      this.object = obj;

      this.objectFields = Object.keys(this.object); //TODO switch to layout api
    } );
  }

  retrieveRelations(objectName: string): void {
    this.relationService.retrieveRelations(objectName).subscribe( relations => {
      this.relations = relations;
    } );
  }

  sendCreateObjectRequestForRelated(objectName: string | null, relatedField: string) {
    this.modalService.openModal('object-creator', {
        type: 'creator',
        mode: 'create',
        objectName: objectName },
      instance => {
        instance.mode = 'create';
        instance.objectName = objectName;

        instance.layoutLoadedCallback = (fields: any, values: any) => {
          if (fields.includes(relatedField)) {
            values[relatedField] = this.objectId;
          }
          else {
            alert('Error, no related field on ' + objectName + ' layout!');
          }
        }
      });
  }

  sendDeleteObjectRequest(objectName: string, objectId: string) {
    this.modalService.openModal('prompt', {},
        instance => {
      instance.promptData = {
        message: 'Are you sure you want to delete this object?',
        actions: {
          'Delete': ( prompt: any ) => {
            this.objectService.deleteObject(<string>objectName, objectId);
            this.modalService.closeModal();
          },
          'Cancel': ( prompt: any ) => {
            this.modalService.closeModal();
          }
        }
      }
    });
  }

  sendEditObjectRequestForRelated(objectName: string, object: any) {
    this.modalService.openModal('object-creator', {},
      instance => {
        instance.mode = 'edit';
        instance.objectName = objectName;
        instance.object = object;
      });
  }

  sendEditObjectRequest(objectName: string, object: any) {
    this.modalService.openModal('object-creator', {},
      instance => {
        instance.mode = 'edit';
        instance.objectName = objectName;
        instance.object = object;
      });
  }

  handleRelationClicked(body: any): void {
    const clickType = body.type;
    const relationObjectName = body.objectName;

    if (clickType === 'new') {
      const relatedField = body.relatedField;
      this.sendCreateObjectRequestForRelated(relationObjectName, relatedField);
    }
    else if (clickType == 'edit') {
      const objectName = body.objectName;
      const object = body.object;
      alert(JSON.stringify(object));
      this.sendEditObjectRequestForRelated(objectName, object);
    }
  }

}
