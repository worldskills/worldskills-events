import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  showBreadcrumbs: Subject<boolean> = new Subject<boolean>();
  skillMenu: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();
  sectorMenu: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();

  constructor() {
  }
}
