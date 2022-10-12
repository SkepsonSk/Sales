import {Action} from "./action";

export class UrlAction extends Action {

  override handle(data: any, objectName: string, objectId: string): boolean {
    window.location.href = data.url;
    return true;
  }

}
