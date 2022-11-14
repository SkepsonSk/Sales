import { Injectable } from '@angular/core';
import Pusher from "pusher-js";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    })
  }

  subscribe(channel: string) {
    return this.pusher.subscribe(channel);
  }
}
