import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ObjectUtils {

  constructor() {}

  public getObjectFromLayout(object: any, layout: any) {
    let dataObject: any = {};
    const layoutSections = Object.keys(layout);

    for (const section of layoutSections) {
      for (const fieldName of layout[section]) {
        dataObject[fieldName.field] = object != null ? object[fieldName.field] : null;
      }
    }
    return dataObject;
  }

}
