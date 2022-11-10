import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ObjectDirective} from "../object.directive";
import {ObjectService} from "../object.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ObjectComponentService} from "../object-component.service";
import {BaseObjectComponent} from "../base-object.component";
import {ModalService} from "../modal-service.service";
import {RelationsService} from "../service/relations.service";
import {LayoutService} from "../layout.service";
import {ActionService} from "../actions/action.service";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  objectName: string = '';
  object: any;

  actionNames: string[] = [];
  actions: any;

  layoutSections!: string[];
  layoutFields: any;
  objectFields: any;


  objectId: string = '';
  state: string = '';

  relations: any;
  relationNames: any;

  @ViewChild(ObjectDirective, {static: true})
  objectManagement!: ObjectDirective

  constructor(
    private objectService: ObjectService,
    private relationService: RelationsService,
    private layoutService: LayoutService,
    private objectComponentService: ObjectComponentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      this.objectName = <string>params.get('objectName');
      this.objectId = <string>params.get('objectId');

      this.retrieveObject(this.objectName, this.objectId);
      this.retrieveRelations(<string>this.objectName);
    } );
  }

  // TODO move to helper class
  randomString(length: number, chars: any) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  //TODO retrieve layout type mapping from record
  retrieveObject(objectName: string | null, objectId: string | null): void {
    this.objectService.retrieveObject(<string>objectName, <string>objectId).subscribe( obj => {
      this.object = obj;

      this.layoutService.retrieveLayout(this.objectName, 'default', 'view')
        .subscribe( layout => {

          this.layoutSections = Object.keys(layout);
          this.layoutFields = layout;
        } );

      this.objectService.retrieveObjectActions(this.objectName)
        .subscribe( actionsData => {
          this.actionNames = Object.keys(actionsData.actions);
          this.actions = actionsData.actions;
        } );

      this.objectManagement.viewContainerRef.clear();
      const objComponent = this.objectComponentService.getComponent(this.objectName);
      if (objComponent != null) {
        const component = this.objectManagement.viewContainerRef.createComponent<BaseObjectComponent>(objComponent.component);
        (<any>component.instance).object = obj;
      }
    } );
  }

  retrieveRelations(objectName: string): void {
    this.state = this.randomString(24, 'abcdefghijklmnoprstq1234567890');
    this.relationService.retrieveRelations(objectName).subscribe( relations => {

      this.relationNames = Object.keys(relations);
      this.relations = relations;
    } );
  }

  handleAction(actionName: string) {
    const action = this.actions[actionName];
    const actionType = this.actionService.getActionType(action.type);
    actionType?.handle(action, this.objectName, this.objectId);
  }

  sendCreateObjectRequestForRelated(objectName: string | null, relatedField: string) {
    this.modalService.openModal('object-creator', {
        type: 'creator',
        mode: 'create',
        objectName: objectName },
      instance => {
        instance.mode = 'create';
        instance.objectName = objectName;

        instance.layoutLoadedCallback = (dataObject: any) => {
          dataObject[relatedField] = this.objectId;
        }

        instance.afterResponse = () => {
          this.retrieveObject(this.objectName, this.objectId);
          this.retrieveRelations(<string>this.objectName);
          this.modalService.closeModal();
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
            this.objectService.deleteObject(<string>objectName, objectId).subscribe( result => {

              if (this.objectName === objectName) {
                this.router.navigate(['/object', this.objectName])
                  .catch(err => console.log(err));
              }
              else {
                this.state = this.randomString(24, 'abcdefghijklmnoprstq1234567890');
              }

              this.modalService.closeModal();
            } );
          },
          'Cancel': ( prompt: any ) => {
            this.modalService.closeModal();
          }
        }
      }
    });
  }

  sendEditObjectRequest(objectName: string, objectId: any) {
    this.modalService.openModal('object-creator', {},
      instance => {
        instance.mode = 'edit';
        instance.objectName = objectName;
        instance.objectId = objectId
        instance.afterResponse = () => {
          this.retrieveObject(this.objectName, this.objectId);
          this.retrieveRelations(<string>this.objectName);
          this.modalService.closeModal();
        }
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
      const objectId = body.objectId;
      this.sendEditObjectRequest(objectName, objectId);
    }
    else if (clickType == 'delete') {
      const objectName = body.objectName;
      const objectId = body.objectId;
      this.sendDeleteObjectRequest(objectName, objectId);
    }
  }

}
