import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ObjectService} from "../object.service";
import {ObjectDirective} from "../object.directive";
import {ObjectComponentService} from "../object-component.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
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

      const accountObj = this.objectComponentService.getComponent(objectName);

      const accountComponentFactory = this.componentFactoryResolver.resolveComponentFactory(accountObj.component);
      this.objectManagement.viewContainerRef.createComponent<BaseObjectComponent>(accountComponentFactory);
    } );
  }

  getObjects(): void {
    this.objectService.getObjects('account')
      .subscribe( obj => {
        alert(JSON.stringify(obj));
      } );
  }

}
