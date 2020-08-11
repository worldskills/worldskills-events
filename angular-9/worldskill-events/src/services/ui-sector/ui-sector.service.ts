import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiSectorService {

  subject: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();

}
