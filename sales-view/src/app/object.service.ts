import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private http: HttpClient
  ) {}

  getObjects(objectName: string): Observable<any> {
    return this.http.get(`http://localhost:19061/object/${objectName}`);
  }
}
