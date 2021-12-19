import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private httpClient: HttpClient
  ) {}

  retrieveLayout(objectName: string, objectType: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.httpClient.get(`${apiUrl}/layout/${objectName}/${objectType}`);
  }

}
