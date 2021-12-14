import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    return this.token != null;
  }

  getToken(): string | null {
    return this.token;
  }

  authenticate(username: string, password: string): Observable<any> {
    const apiUrl = environment.authUrl;

    return new Observable<any>( (observer) => {
      this.httpClient.post(`${apiUrl}/authentication/authenticate`, {
        username: username,
        password: password
      })
        .subscribe( (tokenData: any) => {

          if (tokenData.ok) {
            observer.next({ok: true});
            this.token = tokenData.token;
          }
          else {
            observer.error({ok: false, error: tokenData.error});
          }

        } )
    } );

  }
}
