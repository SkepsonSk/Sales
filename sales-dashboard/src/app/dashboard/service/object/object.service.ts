import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  listObjects(objectName: string, query: string|null = null): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }
    const queryString = query == null ? '' : `?query=${query}`;
    return this.http.get(`${apiUrl}/object/${objectName}${queryString}`, header);
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

  retrieveObjectFields(objectName: string, objectId: string, fields: [string]): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    const fieldQuery = fields.join(',');
    return this.http.get(`${apiUrl}/object/${objectName}/${objectId}?fields=${fieldQuery}`, header);
  }

  retrieveObjectMetadata(objectName: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/object/${objectName}/metadata`, header);
  }

  retrieveObjectActions(objectName: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return this.http.get(`${apiUrl}/object/${objectName}/actions`, header);
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

  retrieveObjectNames(objectName: string|null = null): Observable<any> {
    const apiUrl = environment.apiUrl;
    let objectNameQuery = '';
    if (objectName) {
      objectNameQuery = `?objectName=${objectName}`;
    }
    return this.http.get(`${apiUrl}/object${objectNameQuery}`);
  }
}
