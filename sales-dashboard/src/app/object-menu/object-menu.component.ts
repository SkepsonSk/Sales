import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {ObjectService} from "../object.service";
import {NavigationService} from "../service/navigation.service";

@Component({
  selector: 'app-object-menu',
  templateUrl: './object-menu.component.html',
  styleUrls: ['./object-menu.component.scss']
})
export class ObjectMenuComponent implements OnInit {

  @Output() close = new EventEmitter();

  objectList: any;

  private wasInside = false;
  private canBeClosed = false;

  constructor(
    private objectService: ObjectService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    setTimeout( () => this.canBeClosed = true, 400 );
    this.handleInputChanged();
  }

  handleMenuItemClick(objectName: string) {
    this.navigationService.navigateObject(objectName, null);
    this.close.emit();
  }

  handleInputChanged(text: any = '') {
    this.objectService.retrieveObjectNames(text).subscribe( objectList => {
      this.objectList = objectList;
    } );
  }

  @HostListener('click')
  handleClickIn() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  handleClickOut() {
    if (!this.wasInside && this.canBeClosed) {
      this.close.emit();
    }
    this.wasInside = false;
  }
}
