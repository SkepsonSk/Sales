import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentPage: string = 'home';

  constructor(private router: Router) { }

  getCurrentPage(): string {
    return this.currentPage;
  }

  navigateHome() {
    this.currentPage = 'home';
    this.router.navigate([`/`]);
  }

  navigateObject(objectName: string, objectId: string | null = null) {
    this.currentPage = objectName;

    if (objectId == null) {
      this.router.navigate([`object`, objectName]);
    }
    else {
      this.router.navigate([`object`, objectName, objectId]);
    }
  }

}
