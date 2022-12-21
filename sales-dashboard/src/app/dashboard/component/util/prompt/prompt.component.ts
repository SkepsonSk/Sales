import {Component, Input, OnInit} from '@angular/core';
import {BaseObjectComponent} from "../../../model/base-object.component";

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements BaseObjectComponent, OnInit {

  @Input() promptData: any;

  promptMessage: string = '';
  promptActions: any;

  constructor() { }

  ngOnInit(): void {
    this.promptMessage = this.promptData.message;
    this.promptActions = Object.keys(this.promptData.actions);
  }

}
