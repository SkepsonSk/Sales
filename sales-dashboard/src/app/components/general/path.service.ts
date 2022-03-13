import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PathData} from "../../model/path-data";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(
    private http: HttpClient
  ) {}

  getPathData(pathName: string): Observable<PathData[]> {
    const url = `${environment.apiUrl}/path/${pathName}`;
    return <Observable<PathData[]>>this.http.get(url);
  }

}
