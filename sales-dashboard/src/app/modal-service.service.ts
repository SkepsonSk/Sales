import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private subject = new Subject<any>();

  openModal(modalComponentName : string,
            data: any,
            componentInstantiateCallback: (instance: any) => void) {

    this.subject.next({
      modalVisible: true,
      modalComponentName: modalComponentName,
      data: data,
      componentInstantiateCallback: componentInstantiateCallback
    });
  }

  closeModal() {
    this.subject.next({
      modalVisible: false
    });
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
