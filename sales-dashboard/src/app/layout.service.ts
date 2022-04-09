import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveLayout(objectName: string, layoutName: string, layoutType: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/layout/${objectName}/${layoutName}/${layoutType}`);
  }

  retrieveLayoutEdit(objectName: string, layoutType: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/layout/${objectName}/${layoutType}/edit`);
  }

}
