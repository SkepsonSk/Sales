import { Component, OnInit } from '@angular/core';
import {ObjectService} from "../object.service";
import {AuthService} from "../service/auth.service";
import {NavigationService} from "../service/navigation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  objectNames: any;
  selectedPage: number = 0;

  searchPhrase: string = '';

  constructor(
    private objectService: ObjectService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadObjectNames();
  }

  loadObjectNames() : void {
    this.objectService.retrieveObjectNames().subscribe( objectNames => {
      this.objectNames = objectNames;
    } );
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  handleSearchInput(text: string): void {
    this.searchPhrase = text;
  }

  handleSearchFormSubmit(): boolean {
    this.router.navigate(['/search'], {
      queryParams: {
        phrase: this.searchPhrase
      }
    })
    return false;
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
