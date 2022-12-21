import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  @Input() object: any;

  constructor() { }

  ngOnInit(): void {
  }
}
