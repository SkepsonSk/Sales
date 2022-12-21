import {Component, OnInit} from '@angular/core';
import {BaseObjectComponent} from "../../../../dashboard/model/base-object.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements BaseObjectComponent, OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
