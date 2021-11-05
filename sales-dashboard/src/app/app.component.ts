import { Component } from '@angular/core';
import {ObjectComponentService} from "./object-component.service";
import {AccountComponent} from "./account/account.component";
import {BaseObject} from "./base-object";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sales-dashboard';

  constructor(
    private objectComponentService: ObjectComponentService
  ) {}

  ngOnInit() {
    this.objectComponentService.registerComponent('account', new BaseObject(AccountComponent))
  }

}
