import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ObjectDirective} from "../object.directive";
import {ObjectService} from "../object.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ObjectComponentService} from "../object-component.service";
import {BaseObjectComponent} from "../base-object.component";

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  @ViewChild(ObjectDirective, {static: true})
  objectManagement!: ObjectDirective

  constructor(
    private objectService: ObjectService,
    private objectComponentService: ObjectComponentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      const objectName: string | null = params.get('objectName');
      const objectId: string | null = params.get('objectId');

      const obj = this.objectComponentService.getComponent(objectName);
      this.objectManagement.viewContainerRef.createComponent<BaseObjectComponent>(obj.component);
    } );
  }

}
