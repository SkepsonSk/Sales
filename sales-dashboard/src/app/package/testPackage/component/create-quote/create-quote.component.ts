import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {
  @Input() objectName : string = '';
  @Input() objectId : string = '';

  quoteName = '';

  constructor() { }

  ngOnInit(): void {
  }
}
