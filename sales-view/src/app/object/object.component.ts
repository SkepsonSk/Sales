import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ObjectService} from "../object.service";
import {ObjectDirective} from "../object.directive";
import {AccountComponent} from "../account/account.component";
import {BaseObjectComponent} from "../base-object.component";
import {ObjectComponentService} from "../object-component.service";
import {BaseObject} from "../base-object";

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
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    //this.getObjects();

    const accountObj = this.objectComponentService.getComponent('account');

    const accountComponentFactory = this.componentFactoryResolver.resolveComponentFactory(accountObj.component);
    this.objectManagement.viewContainerRef.createComponent<BaseObjectComponent>(accountComponentFactory);
  }

  getObjects(): void {
    this.objectService.getObjects('account')
      .subscribe( obj => {
        alert(JSON.stringify(obj));
      } );
  }

}
