import { Component, OnInit } from '@angular/core';
import {ObjectService} from "../object.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  objectNames: any;

  constructor(
    private objectService: ObjectService
  ) {}

  ngOnInit(): void {
    this.loadObjectNames();
  }

  loadObjectNames() : void {
    this.objectService.retrieveObjectNames().subscribe( objectNames => {
      this.objectNames = objectNames;
    } );
  }

  firstCharUpper(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
