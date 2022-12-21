import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private subject = new Subject<any>();

  constructor() {}

  showToast(type: string, message: string) {
    this.subject.next({
      type: type,
      message: message
    });
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
