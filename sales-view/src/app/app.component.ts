import {Component, OnInit} from '@angular/core';
import {ObjectComponentService} from "./object-component.service";
import {AccountComponent} from "./account/account.component";
import {BaseObject} from "./base-object";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sales-view';

  constructor(
    private objectComponentService: ObjectComponentService
  ) {}

  ngOnInit() {
    this.objectComponentService.registerComponent('account', new BaseObject(AccountComponent))
  }

}
