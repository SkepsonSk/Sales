import {Injectable,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  constructor(
    private httpClient: HttpClient
  ) {}

  retrieveRelations(objectName: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.httpClient.get(`${apiUrl}/relation/${objectName}`);
  }

  retrieveObjects(objectName: string, relationName: string, objectId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.httpClient.get(`${apiUrl}/relation/${objectName}/${relationName}/${objectId}`);
  }

}
