import { Component, OnInit } from '@angular/core';
import {ObjectService} from "../object.service";
import {AuthService} from "../service/auth.service";
import {NavigationService} from "../service/navigation.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  objectNames: any;
  selectedPage: number = 0;

  constructor(
    private objectService: ObjectService,
    private authService: AuthService,
    private navigationService: NavigationService
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

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  setPage(page: number) {
    this.selectedPage = page;
  }

  getCurrentPage(): string {
    return this.navigationService.getCurrentPage();
  }

  navigateHome() {
    this.navigationService.navigateHome();
  }

  navigateObject(objectName: string) {
    this.navigationService.navigateObject(objectName);
  }

}
