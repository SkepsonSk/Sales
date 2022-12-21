import { Injectable } from '@angular/core';
import {EventService} from "../../event/event.service";

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {

  constructor(
    private eventService: EventService
  ) { }

  async loadComponents() {
    this.eventService.on('components-load', (arg) => {
      console.log('TEST');
    });
  }

}
