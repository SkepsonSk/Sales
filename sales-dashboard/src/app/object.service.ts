import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private http: HttpClient
  ) {}

  listObjects(objectName: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/object/${objectName}`);
  }

  retrieveObject(objectName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/object/${objectName}/${objectId}`);
  }

  createObject(objectName: string, objectData: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.post(`${apiUrl}/object/${objectName}`, objectData);
  }

  editObject(objectName: string, objectId: string, objectData: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.put(`${apiUrl}/object/${objectName}/${objectId}`, objectData);
  }

  deleteObject(objectName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.delete(`${apiUrl}/object/${objectName}/${objectId}`);
  }

  retrieveObjectNames(): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/object`);
  }
}
