import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  @Input() object: any;

  constructor() { }

  ngOnInit(): void {
  }

}
