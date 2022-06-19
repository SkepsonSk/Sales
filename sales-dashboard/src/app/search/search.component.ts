import { Component, OnInit } from '@angular/core';
import {ObjectService} from "../object.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  phrase: string = '';
  recordsFound: any;
  objectsFound?: string[];

  constructor(
    private objectService: ObjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.phrase = params['phrase'];
      this.objectService.search(this.phrase).subscribe( results => {
        this.recordsFound = results;
        this.objectsFound = Object.keys(results);
      } );
    } );


  }

}
