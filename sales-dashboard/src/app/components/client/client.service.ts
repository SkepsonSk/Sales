import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) {}

  acceptClient(clientId: string): Observable<any> {
    const apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/client/convert/${clientId}`);
  }

}
