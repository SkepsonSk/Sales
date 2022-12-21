import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string = '';
  private token: string | null = null;
  private refreshToken: string | null = null;
  private expiresToken: number = 0;
  private expiresRefreshToken: number = 0;

  constructor(private httpClient: HttpClient) {}

  isAuthenticated(): boolean {
    const now = new Date().getTime();

    if (this.token != null && this.expiresToken >= now) {
      return true;
    }
    else {

      const token = localStorage.getItem('sales-token');
      const tokenExpires = localStorage.getItem('sales-expires-token');

      if (token != null && tokenExpires != null) {
        //TODO refresh
        if (parseInt(tokenExpires) >= now) {
          this.token = token;
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }

    }
  }

  getToken(): string | null {
    return this.token;
  }

  getUsername(): string | null {
    return this.username;
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
            const now = new Date().getTime();

            observer.next({ok: true});
            this.username = tokenData.name;
            this.token = tokenData.token;
            this.refreshToken = tokenData.refreshToken;
            this.expiresToken = tokenData.expires.token*1000 + now;
            this.expiresRefreshToken = tokenData.expires.refreshToken*1000 + now;

            localStorage.setItem('sales-token', <string>this.token);
            localStorage.setItem('sales-refresh-token', <string>this.refreshToken);
            localStorage.setItem('sales-expires-token', this.expiresToken.toString());
            localStorage.setItem('sales-expires-refresh-token', this.expiresRefreshToken.toString());
          }
          else {
            observer.error({ok: false, error: tokenData.error});
          }

        } )
    } );

  }

}
