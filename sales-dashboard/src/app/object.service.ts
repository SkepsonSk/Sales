import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {AuthService} from "./service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  listObjects(objectName: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/object/${objectName}`, header);
  }

  search(searchPhrase: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/search?phrase=${searchPhrase}`, header);
  }

  retrieveObject(objectName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/object/${objectName}/${objectId}/default/view`, header);
  }

  retrieveObjectForEdit(objectName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/object/${objectName}/${objectId}/edit`, header);
  }

  createObject(objectName: string, objectData: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.post(`${apiUrl}/object/${objectName}`, objectData, header);
  }

  editObject(objectName: string, objectId: string, objectData: any): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.put(`${apiUrl}/object/${objectName}/${objectId}`, objectData, header);
  }

  deleteObject(objectName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.delete(`${apiUrl}/object/${objectName}/${objectId}`, header);
  }

  retrieveObjectNames(): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/object`);
  }
}
