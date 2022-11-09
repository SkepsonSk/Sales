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
        console.log(fieldName.field);
        dataObject[fieldName.field] = object != null ? object[fieldName.field] : null;
      }
    }
    return dataObject;
  }

}
