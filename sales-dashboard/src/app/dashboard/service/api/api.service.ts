import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  public async get(endpoint: string): Promise<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return new Promise( (resolve, reject) => {
      this.http.get(`${apiUrl}/${endpoint}`, header)
        .subscribe({
          complete: () => resolve(this),
          error: () => reject(this)
        })
    } );
  }

  public async post(endpoint: string, data: any): Promise<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return new Promise( (resolve, reject) => {
      this.http.post(`${apiUrl}/${endpoint}`, data, header)
        .subscribe({
          complete: () => resolve(this),
          error: () => reject(this)
        })
    } );
  }

  public async put(endpoint: string, data: any): Promise<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return new Promise( (resolve, reject) => {
      this.http.put(`${apiUrl}/${endpoint}`, data, header)
        .subscribe({
          complete: () => resolve(this),
          error: () => reject(this)
        })
    } );
  }

  public async delete(endpoint: string): Promise<any> {
    const apiUrl = environment.apiUrl;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }

    return new Promise( (resolve, reject) => {
      this.http.delete(`${apiUrl}/${endpoint}`, header)
        .subscribe({
          complete: () => resolve(this),
          error: () => reject(this)
        })
    } );
  }
}
